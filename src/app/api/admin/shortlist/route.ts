import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import { sendShortlistNotification } from '@/lib/email';
import type { Session } from 'next-auth';

// POST to shortlist an application
export async function POST(request: NextRequest) {
  try {
    const session: Session | null = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    try {
      await requireAdmin(session.user.email);
    } catch (error) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const prisma = await getPrismaClient();
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const { applicationId } = await request.json();

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    // Find the application
    const application = await prisma.recruitmentApplication.findUnique({
      where: { id: applicationId }
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Update application status to shortlisted
    const updatedApplication = await prisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: {
        status: 'shortlisted',
        shortlistedAt: new Date()
      }
    });

    // Send shortlist notification email
    try {
      const name = `${application.firstName || ''} ${application.lastName || ''}`.trim() || 'Applicant';
      const email = application.email || '';
      
      if (email) {
        const emailResult = await sendShortlistNotification(email, name);
        
        if (!emailResult.success) {
          console.error('Failed to send shortlist notification email:', emailResult.error);
        } else {
          console.log('Shortlist notification email sent successfully to:', email);
        }
      }
    } catch (emailError) {
      console.error('Error sending shortlist notification email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      application: updatedApplication,
      message: 'Candidate shortlisted successfully'
    });
  } catch (error) {
    console.error('Error shortlisting application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

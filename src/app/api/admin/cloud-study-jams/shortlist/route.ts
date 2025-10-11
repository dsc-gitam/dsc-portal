import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import type { Session } from 'next-auth';

// POST to shortlist a Cloud Study Jams registration
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

    const { registrationId } = await request.json();

    if (!registrationId) {
      return NextResponse.json({ error: 'Registration ID is required' }, { status: 400 });
    }

    // Find the registration
    const registration = await prisma.cloudStudyJamsRegistration.findUnique({
      where: { id: registrationId }
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Update registration status to shortlisted
    const updatedRegistration = await prisma.cloudStudyJamsRegistration.update({
      where: { id: registrationId },
      data: {
        status: 'shortlisted',
        shortlistedAt: new Date()
      }
    });

    // Note: Email notification can be added here if needed
    // For Cloud Study Jams, you might want to send different content than recruitment

    return NextResponse.json({ 
      registration: updatedRegistration,
      message: 'Participant shortlisted successfully'
    });
  } catch (error) {
    console.error('Error shortlisting CSJ registration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

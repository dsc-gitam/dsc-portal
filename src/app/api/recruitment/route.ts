import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { sendApplicationConfirmation } from '@/lib/email';
import type { Session } from 'next-auth';

export async function GET() {
  try {
    const session: Session | null = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const prisma = await getPrismaClient();
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const application = await prisma.recruitmentApplication.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ application });
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session: Session | null = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const prisma = await getPrismaClient();
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const data = await request.json();

    // Check if user already has an application
    const existingApplication = await prisma.recruitmentApplication.findFirst({
      where: { userId: user.id },
    });

    let application;
    
    if (existingApplication) {
      // Update existing application
      application = await prisma.recruitmentApplication.update({
        where: { id: existingApplication.id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new application
      application = await prisma.recruitmentApplication.create({
        data: {
          userId: user.id,
          ...data,
        },
      });
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error('Error saving application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session: Session | null = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const prisma = await getPrismaClient();
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const data = await request.json();

    const application = await prisma.recruitmentApplication.findFirst({
      where: { userId: user.id },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const updatedApplication = await prisma.recruitmentApplication.update({
      where: { id: application.id },
      data: {
        ...data,
        status: 'submitted',
        submittedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Send confirmation email after successful application submission
    try {
      const emailData = {
        firstName: updatedApplication.firstName || '',
        lastName: updatedApplication.lastName || '',
        email: updatedApplication.email || user.email || '',
        studentId: updatedApplication.studentId || '',
        year: updatedApplication.yearOfStudy || '',
        branch: updatedApplication.branch || '',
        role: updatedApplication.selectedRole || '',
      };

      const emailResult = await sendApplicationConfirmation(emailData);
      
      if (!emailResult.success) {
        console.error('Failed to send confirmation email:', emailResult.error);
        // Don't fail the request if email fails, but log the error
      } else {
        console.log('Confirmation email sent successfully to:', emailData.email);
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ application: updatedApplication });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
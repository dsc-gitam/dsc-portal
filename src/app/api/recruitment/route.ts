import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import type { Session } from 'next-auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any = null;

// Conditionally import prisma only if we can
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { prisma: prismaClient } = require('@/lib/prisma');
  prisma = prismaClient;
} catch (error) {
  console.warn("Prisma client not available during build:", (error as Error).message);
}

export async function GET() {
  try {
    const session: Session | null = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    return NextResponse.json({ application: updatedApplication });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
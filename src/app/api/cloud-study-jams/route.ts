import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
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

    const registration = await prisma.cloudStudyJamsRegistration.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ registration });
  } catch (error) {
    console.error('Error fetching registration:', error);
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

    // Check if user already has a registration
    const existingRegistration = await prisma.cloudStudyJamsRegistration.findFirst({
      where: { userId: user.id },
    });

    let registration;
    
    if (existingRegistration) {
      // Update existing registration
      registration = await prisma.cloudStudyJamsRegistration.update({
        where: { id: existingRegistration.id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new registration
      registration = await prisma.cloudStudyJamsRegistration.create({
        data: {
          userId: user.id,
          ...data,
        },
      });
    }

    return NextResponse.json({ registration });
  } catch (error) {
    console.error('Error saving registration:', error);
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

    let registration = await prisma.cloudStudyJamsRegistration.findFirst({
      where: { userId: user.id },
    });

    if (!registration) {
      registration = await prisma.cloudStudyJamsRegistration.create({
        data: {
          userId: user.id,
          ...data,
        status: 'submitted',
        submittedAt: new Date(),
        updatedAt: new Date(),
        },
      });
    return NextResponse.json({ registration: registration });
    }

    const updatedRegistration = await prisma.cloudStudyJamsRegistration.update({
      where: { id: registration.id },
      data: {
        ...data,
        status: 'submitted',
        submittedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ registration: updatedRegistration });
  } catch (error) {
    console.error('Error submitting registration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

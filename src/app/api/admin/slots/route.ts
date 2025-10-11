import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import type { Session } from 'next-auth';

// GET all interview slots
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

    const slots = await prisma.interviewSlot.findMany({
      include: {
        bookings: {
          include: {
            application: {
              select: {
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST to create a new interview slot (admin only)
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

    const { date, startTime, endTime, venue } = await request.json();

    if (!date || !startTime || !endTime || !venue) {
      return NextResponse.json({ 
        error: 'All fields are required: date, startTime, endTime, venue' 
      }, { status: 400 });
    }

    const slot = await prisma.interviewSlot.create({
      data: {
        date: new Date(date),
        startTime,
        endTime,
        venue,
        isAvailable: true
      }
    });

    return NextResponse.json({ 
      slot,
      message: 'Interview slot created successfully'
    });
  } catch (error) {
    console.error('Error creating slot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE to remove an interview slot (admin only)
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const slotId = searchParams.get('id');

    if (!slotId) {
      return NextResponse.json({ error: 'Slot ID is required' }, { status: 400 });
    }

    // Check if slot has bookings
    const bookings = await prisma.interviewBooking.findMany({
      where: { slotId }
    });

    if (bookings.length > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete slot with existing bookings' 
      }, { status: 400 });
    }

    await prisma.interviewSlot.delete({
      where: { id: slotId }
    });

    return NextResponse.json({ 
      message: 'Interview slot deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting slot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

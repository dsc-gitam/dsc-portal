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

// Helper function to check for overlapping slots
async function checkForOverlaps(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma: any,
  date: Date,
  startTime: string,
  endTime: string,
  venue: string
): Promise<boolean> {
  const existingSlots = await prisma.interviewSlot.findMany({
    where: {
      date: date,
      venue: venue
    }
  });

  // Convert time strings to minutes for comparison
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  for (const slot of existingSlots) {
    const slotStart = timeToMinutes(slot.startTime);
    const slotEnd = timeToMinutes(slot.endTime);

    // Check for overlap: new slot starts before existing ends AND new slot ends after existing starts
    if (newStart < slotEnd && newEnd > slotStart) {
      return true;
    }
  }

  return false;
}

// Helper function to generate time slots
function generateTimeSlots(
  startTime: string,
  endTime: string,
  durationMinutes: number
): Array<{ startTime: string; endTime: string }> {
  const slots: Array<{ startTime: string; endTime: string }> = [];

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  let currentStart = startMinutes;

  while (currentStart + durationMinutes <= endMinutes) {
    const currentEnd = currentStart + durationMinutes;
    slots.push({
      startTime: minutesToTime(currentStart),
      endTime: minutesToTime(currentEnd)
    });
    currentStart = currentEnd;
  }

  return slots;
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
    } catch {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const prisma = await getPrismaClient();
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const body = await request.json();
    const { date, startTime, endTime, venue, isBulk, slotDuration } = body;

    if (!date || !startTime || !endTime || !venue) {
      return NextResponse.json({ 
        error: 'All fields are required: date, startTime, endTime, venue' 
      }, { status: 400 });
    }

    // Bulk creation mode
    if (isBulk) {
      if (!slotDuration || slotDuration <= 0) {
        return NextResponse.json({ 
          error: 'Valid slot duration is required for bulk creation' 
        }, { status: 400 });
      }

      // Generate time slots
      const timeSlots = generateTimeSlots(startTime, endTime, slotDuration);

      if (timeSlots.length === 0) {
        return NextResponse.json({ 
          error: 'No slots can be generated with the given time range and duration' 
        }, { status: 400 });
      }

      // Check for overlaps
      const slotDate = new Date(date);
      const overlappingSlots: string[] = [];

      for (const timeSlot of timeSlots) {
        const hasOverlap = await checkForOverlaps(
          prisma,
          slotDate,
          timeSlot.startTime,
          timeSlot.endTime,
          venue
        );

        if (hasOverlap) {
          overlappingSlots.push(`${timeSlot.startTime} - ${timeSlot.endTime}`);
        }
      }

      if (overlappingSlots.length > 0) {
        return NextResponse.json({ 
          error: `The following slots overlap with existing slots: ${overlappingSlots.join(', ')}` 
        }, { status: 400 });
      }

      // Create all slots
      const createdSlots = await Promise.all(
        timeSlots.map(timeSlot =>
          prisma.interviewSlot.create({
            data: {
              date: slotDate,
              startTime: timeSlot.startTime,
              endTime: timeSlot.endTime,
              venue,
              isAvailable: true
            }
          })
        )
      );

      return NextResponse.json({ 
        slots: createdSlots,
        message: `${createdSlots.length} interview slots created successfully`
      });
    }

    // Single slot creation mode (original behavior)
    const slotDate = new Date(date);

    // Check for overlap
    const hasOverlap = await checkForOverlaps(prisma, slotDate, startTime, endTime, venue);

    if (hasOverlap) {
      return NextResponse.json({ 
        error: 'This slot overlaps with an existing slot at the same venue' 
      }, { status: 400 });
    }

    const slot = await prisma.interviewSlot.create({
      data: {
        date: slotDate,
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
    } catch {
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

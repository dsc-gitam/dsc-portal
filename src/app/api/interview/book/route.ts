import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { sendInterviewConfirmation } from '@/lib/email';
import type { Session } from 'next-auth';
import type { Prisma } from '@prisma/client';

// POST to book an interview slot
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

    // Check if user has a shortlisted application
    const application = await prisma.recruitmentApplication.findFirst({
      where: {
        userId: user.id,
        status: 'shortlisted'
      }
    });

    if (!application) {
      return NextResponse.json({ 
        error: 'No shortlisted application found. Only shortlisted candidates can book interview slots.' 
      }, { status: 403 });
    }

    // Check if user already has a booking
    const existingBooking = await prisma.interviewBooking.findFirst({
      where: { userId: user.id }
    });

    if (existingBooking) {
      return NextResponse.json({ 
        error: 'You have already booked an interview slot' 
      }, { status: 400 });
    }

    const { slotId } = await request.json();

    if (!slotId) {
      return NextResponse.json({ error: 'Slot ID is required' }, { status: 400 });
    }

    // Check if slot exists and is available
    const slot = await prisma.interviewSlot.findUnique({
      where: { id: slotId },
      include: {
        bookings: true
      }
    });

    if (!slot) {
      return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
    }

    if (!slot.isAvailable || slot.bookings.length > 0) {
      return NextResponse.json({ 
        error: 'This slot is no longer available' 
      }, { status: 400 });
    }

    // Create booking and mark slot as unavailable in a transaction
    const booking = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newBooking = await tx.interviewBooking.create({
        data: {
          userId: user.id,
          applicationId: application.id,
          slotId: slot.id,
          status: 'confirmed'
        }
      });

      await tx.interviewSlot.update({
        where: { id: slot.id },
        data: { isAvailable: false }
      });

      return newBooking;
    });

    // Send confirmation email
    try {
      const name = `${application.firstName || ''} ${application.lastName || ''}`.trim() || 'Applicant';
      const email = application.email || user.email || '';
      const date = slot.date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const time = `${slot.startTime} - ${slot.endTime}`;
      
      if (email) {
        const emailResult = await sendInterviewConfirmation(email, name, date, time);
        
        if (!emailResult.success) {
          console.error('Failed to send interview confirmation email:', emailResult.error);
        } else {
          console.log('Interview confirmation email sent successfully to:', email);
        }
      }
    } catch (emailError) {
      console.error('Error sending interview confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      booking,
      slot,
      message: 'Interview slot booked successfully'
    });
  } catch (error) {
    console.error('Error booking slot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

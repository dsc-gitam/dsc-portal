import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import type { Session } from 'next-auth';

// GET all applications for admin with filters
export async function GET(request: NextRequest) {
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
    const yearFilter = searchParams.get('year');
    const branchFilter = searchParams.get('branch');
    const statusFilter = searchParams.get('status');
    const roleFilter = searchParams.get('role');

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      status: {
        not: 'draft' // Only show submitted applications
      }
    };

    if (yearFilter) where.yearOfStudy = yearFilter;
    if (branchFilter) where.branch = branchFilter;
    if (statusFilter) where.status = statusFilter;
    if (roleFilter) where.selectedRole = roleFilter;

    const applications = await prisma.recruitmentApplication.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        interviewBooking: {
          include: {
            slot: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

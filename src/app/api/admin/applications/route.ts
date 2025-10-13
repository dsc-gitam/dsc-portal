import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import type { Session } from 'next-auth';

// GET all applications for admin with filters and pagination
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

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const skip = (page - 1) * limit;

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

    // Get total count for pagination
    const totalCount = await prisma.recruitmentApplication.count({ where });

    // Fetch paginated applications
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
      },
      skip,
      take: limit
    });

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasMore: skip + applications.length < totalCount
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

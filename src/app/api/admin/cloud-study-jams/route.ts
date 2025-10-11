import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import type { Session } from 'next-auth';

// GET all cloud study jams registrations for admin
export async function GET(request: NextRequest) {
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
    const statusFilter = searchParams.get('status');
    const genderFilter = searchParams.get('gender');
    const graduationYearFilter = searchParams.get('graduationYear');

    // Build where clause
    const where: any = {
      status: {
        not: 'draft' // Only show submitted registrations
      }
    };

    if (statusFilter) where.status = statusFilter;
    if (genderFilter) where.gender = genderFilter;
    if (graduationYearFilter) where.graduationYear = graduationYearFilter;

    const registrations = await prisma.cloudStudyJamsRegistration.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching CSJ registrations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

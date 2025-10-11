import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import type { Session } from 'next-auth';

// GET statistics for Cloud Study Jams
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
    const statusFilter = searchParams.get('status') || 'submitted';

    // Get all registrations with the specified status
    const registrations = await prisma.cloudStudyJamsRegistration.findMany({
      where: {
        status: statusFilter
      }
    });

    // Calculate statistics
    const stats = {
      total: registrations.length,
      byGender: {
        male: registrations.filter(reg => reg.gender?.toLowerCase() === 'male').length,
        female: registrations.filter(reg => reg.gender?.toLowerCase() === 'female').length,
        other: registrations.filter(reg => 
          reg.gender && 
          reg.gender.toLowerCase() !== 'male' && 
          reg.gender.toLowerCase() !== 'female'
        ).length,
        notSpecified: registrations.filter(reg => !reg.gender).length
      },
      byGraduationYear: registrations.reduce((acc: any, reg) => {
        const year = reg.graduationYear || 'Not specified';
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      }, {}),
      withLaptop: registrations.filter(reg => 
        reg.hasLaptop?.toLowerCase() === 'yes' || reg.hasLaptop?.toLowerCase() === 'true'
      ).length,
      withoutLaptop: registrations.filter(reg => 
        reg.hasLaptop?.toLowerCase() === 'no' || reg.hasLaptop?.toLowerCase() === 'false'
      ).length,
      verified: registrations.filter(reg => 
        reg.newAccountVerified?.toLowerCase() === 'yes' || reg.newAccountVerified?.toLowerCase() === 'true'
      ).length,
      notVerified: registrations.filter(reg => 
        reg.newAccountVerified?.toLowerCase() === 'no' || reg.newAccountVerified?.toLowerCase() === 'false'
      ).length
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching CSJ statistics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

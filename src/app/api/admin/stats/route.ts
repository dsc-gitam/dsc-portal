import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPrismaClient, isDatabaseAvailable } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import type { Session } from 'next-auth';
import type { RecruitmentApplication } from '@prisma/client';

// GET statistics for admin dashboard
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
    const statusFilter = searchParams.get('status') || 'shortlisted';

    // Get all applications with the specified status
    const applications = await prisma.recruitmentApplication.findMany({
      where: {
        status: statusFilter
      }
    });

    // Calculate statistics
    const stats = {
      total: applications.length,
      byGender: {
        male: applications.filter((app: RecruitmentApplication) => app.gender?.toLowerCase() === 'male').length,
        female: applications.filter((app: RecruitmentApplication) => app.gender?.toLowerCase() === 'female').length,
        other: applications.filter((app: RecruitmentApplication) => 
          app.gender && 
          app.gender.toLowerCase() !== 'male' && 
          app.gender.toLowerCase() !== 'female'
        ).length,
        notSpecified: applications.filter((app: RecruitmentApplication) => !app.gender).length
      },
      byYear: {
        '1st': applications.filter((app: RecruitmentApplication) => app.yearOfStudy?.includes('1') || app.yearOfStudy?.toLowerCase().includes('first')).length,
        '2nd': applications.filter((app: RecruitmentApplication) => app.yearOfStudy?.includes('2') || app.yearOfStudy?.toLowerCase().includes('second')).length,
        '3rd': applications.filter((app: RecruitmentApplication) => app.yearOfStudy?.includes('3') || app.yearOfStudy?.toLowerCase().includes('third')).length,
        '4th': applications.filter((app: RecruitmentApplication) => app.yearOfStudy?.includes('4') || app.yearOfStudy?.toLowerCase().includes('fourth')).length
      },
      byRole: applications.reduce((acc: Record<string, number>, app: RecruitmentApplication) => {
        const role = app.selectedRole || 'Not specified';
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {}),
      byBranch: applications.reduce((acc: Record<string, number>, app: RecruitmentApplication) => {
        const branch = app.branch || 'Not specified';
        acc[branch] = (acc[branch] || 0) + 1;
        return acc;
      }, {}),
      technical: applications.filter((app: RecruitmentApplication) => {
        const role = app.selectedRole?.toLowerCase() || '';
        return role.includes('technical') || role.includes('developer') || role.includes('web') || role.includes('app');
      }).length,
      nonTechnical: applications.filter((app: RecruitmentApplication) => {
        const role = app.selectedRole?.toLowerCase() || '';
        return role.includes('marketing') || role.includes('design') || role.includes('content') || role.includes('management');
      }).length
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

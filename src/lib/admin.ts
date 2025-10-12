import { getPrismaClient } from './prisma';

// Admin credentials - in production, these should be stored more securely
const ADMIN_EMAILS = [
  'admin1@gitam.in',
  'admin2@gitam.in'
];

export async function isAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  
  try {
    const prisma = await getPrismaClient();
    if (!prisma) return false;
    
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    // Check if user exists and is an admin
    return user?.role === 'admin' || ADMIN_EMAILS.includes(email);
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function requireAdmin(email: string | null | undefined): Promise<boolean> {
  const admin = await isAdmin(email);
  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }
  return true;
}

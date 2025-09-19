// Define global type for Prisma client
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var __prisma: any | undefined;
}

// Dynamic prisma client that initializes at runtime
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prismaClient: any = null;

// Function to get or create Prisma client
export async function getPrismaClient() {
  if (prismaClient) {
    return prismaClient;
  }

  if (globalThis.__prisma) {
    prismaClient = globalThis.__prisma;
    return prismaClient;
  }

  try {
    const { PrismaClient } = await import('@prisma/client');
    prismaClient = new PrismaClient();
    
    if (process.env.NODE_ENV !== 'production') {
      globalThis.__prisma = prismaClient;
    }
    
    return prismaClient;
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    return null;
  }
}

// Legacy export for backward compatibility (will be null during build)
export const prisma = null;

// Helper function to check if database is available
export function isDatabaseAvailable(): boolean {
  return process.env.DATABASE_URL !== undefined;
}
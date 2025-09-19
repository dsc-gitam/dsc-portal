import GoogleProvider from "next-auth/providers/google";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any = null;

// Conditionally import prisma only if we can
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { prisma: prismaClient } = require("./prisma");
  prisma = prismaClient;
} catch (error) {
  console.warn("Prisma client not available during build:", (error as Error).message);
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user }: { user: any }) {
      // Restrict to @gitam.in email addresses only
      if (user.email && user.email.includes("gitam")) {
        // Create or update user in database
        if (prisma) {
          try {
            await prisma.user.upsert({
              where: { email: user.email },
              update: {
                name: user.name,
                image: user.image,
              },
              create: {
                email: user.email,
                name: user.name,
                image: user.image,
              },
            });
          } catch (error) {
            console.error("Database error during sign in:", error);
            // Continue with sign in even if database update fails
          }
        }
        return true;
      }
      return false;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session }: { session: any }) {
      if (session.user?.email && prisma) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: session.user.email },
          });
          if (user) {
            session.user.id = user.id;
          }
        } catch (error) {
          console.error("Database error during session:", error);
        }
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt" as const,
  },
};

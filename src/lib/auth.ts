import GoogleProvider from "next-auth/providers/google";
import { getPrismaClient, isDatabaseAvailable } from "./prisma";

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
        if (isDatabaseAvailable()) {
          try {
            const prisma = await getPrismaClient();
            if (prisma) {
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
            }
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
      if (session.user?.email && isDatabaseAvailable()) {
        try {
          const prisma = await getPrismaClient();
          if (prisma) {
            const user = await prisma.user.findUnique({
              where: { email: session.user.email },
            });
            if (user) {
              session.user.id = user.id;
            }
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

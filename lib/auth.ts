import { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt";
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import AzureADProvider from "next-auth/providers/azure-ad"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { withRetry } from "./retry";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        // Attach the user id from the token
        session.user.id = token.sub;

        // If we have a user id, fetch subscription details from the database
        const userId = token.sub as string | undefined;
        
        if (userId) {
          const dbUser = await withRetry(() => prisma.user.findUnique({
            where: { email: session.user?.email || undefined },
            select: {
              subscriptionTier: true,
              subscriptionStartedAt: true,
              subscriptionExpiresAt: true,
              stripeCustomerId: true,
            },
          }));

          if (dbUser) {
            session.user.subscription = {
              tier: dbUser.subscriptionTier,
              startedAt: dbUser.subscriptionStartedAt ? dbUser.subscriptionStartedAt.toISOString() : null,
              expiresAt: dbUser.subscriptionExpiresAt ? dbUser.subscriptionExpiresAt.toISOString() : null,
              stripeCustomerId: dbUser.stripeCustomerId ?? null,
            } as any;
          }
        }
      }

      return session;
    },
  },
}
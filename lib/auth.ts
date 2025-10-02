import { Session, User } from "next-auth"
import { JWT } from "@auth/core/jwt"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async session({ session, token, user }: { session: Session; token: JWT; user: User }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
}
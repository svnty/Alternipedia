import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      subscription?: {
        tier: "FREE" | "PRO" | null;
        startedAt: string | null;
        expiresAt: string | null;
        stripeCustomerId: string | null;
      }
    }
  }
}

export default NextAuth(authOptions);
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      role?: "USER" | "ADMIN" | "GLOBAL_ADMIN";
      image?: string;
      subscription?: {
        tier: "FREE" | "PRO" | null;
        startedAt: string | null;
        expiresAt: string | null;
        stripeCustomerId: string | null;
      };
      currentEditableBiasId?: number | null;
      moderatedBias?: {
        id?: number | null;
      } | null;
    }
  }
}

export default NextAuth(authOptions);
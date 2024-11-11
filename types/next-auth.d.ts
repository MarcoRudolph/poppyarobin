// types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string | null;
  }
}

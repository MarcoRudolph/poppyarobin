import NextAuth, { NextAuthOptions, User } from "next-auth";
import { db } from "../../../drizzle";
import { users } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        // Benutzer aus der Datenbank abrufen
        const dbUser = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .then((res) => res[0]);

        // Passwortprüfung (hier solltest du dein Passwort-Validierungssystem verwenden)
        if (dbUser && credentials.password === "deinPasswort") {
          // Rückgabe eines Objekts, das dem User-Typ entspricht
          const user: User = {
            id: dbUser.id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

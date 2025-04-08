// import NextAuth from 'next-auth';

// export const authOptions = {
//   providers: [],
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: 'User ID', type: 'text' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(credentials, req) {
        // Prüfen, ob eine ID übergeben wurde
        if (credentials?.id) {
          // Optional: Falls zusätzlich ein Name übergeben wurde, kann dieser gespeichert werden.
          // Ist kein Name vorhanden, kann ein Default-Wert wie 'Anonymous' gesetzt werden.
          return {
            id: credentials.id,
            name: credentials.name || 'Anonymous',
            anonymous: true,
          };
        }
        // Keine ID vorhanden -> Auth fehlgeschlagen
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      // Benutzerobjekt aus dem Token in die Session übernehmen
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      // Beim Erst-Login (authorize erfolgreich) wird user befüllt.
      // Dieses Userobjekt dann ins JWT-Token übernehmen.
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

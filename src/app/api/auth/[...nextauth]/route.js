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
      name: 'Token',
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials, req) {
        if (!credentials?.token) {
          return null;
        }

        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/validate`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: credentials.token }),
            },
          );

          if (response.ok) {
            const data = await response.json();
            return {
              id: data.user.id.toString(),
              name: data.user.name,
              token: data.user.token,
            };
          }
        } catch (error) {
          console.error('Auth error:', error);
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

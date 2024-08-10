import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { createExplorer, getExplorer } from './actions';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getExplorer(user.email);

        if (!existingUser) {
          await createExplorer({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const explorer = await getExplorer(session.user.email);
      session.user.explorerId = explorer.id;

      return session;
    },
  },
  pages: {
    signIn: '/home/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

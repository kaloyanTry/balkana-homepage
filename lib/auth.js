import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createExplorer, getExplorer } from './actions';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile, error }) {
      try {
        const existingExplorer = await getExplorer(user.email);

        if (!existingExplorer) {
          await createExplorer({ email: user.email, fullName: user.name });
        }
        console.log(existingExplorer);
        return true;
      } catch {
        console.log(error);
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

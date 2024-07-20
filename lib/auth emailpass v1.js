import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

//adding simple authorization (https://authjs.dev/getting-started/authentication/credentials):
// import Credentials from 'next-auth/providers/credentials';
// import { saltAndHashPassword } from '@/utils/password';
// import { signInSchema } from '@/lib/zod';
// import { getExplorerFromDb } from '@/lib/actions';

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
    //// adding simple authorization:
    // Credentials({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   authorize: async (credentials) => {
    //     try {
    //       let user = null;

    //       const { email, password } = await signInSchema.parseAsync(
    //         credentials
    //       );

    //       const pwHash = saltAndHashPassword(password);

    //       user = await getExplorerFromDb(email, pwHash);

    //       if (!user) {
    //         throw new Error('User not found.');
    //       }

    //       return user;
    //     } catch (error) {
    //       if (error instanceof ZodError) {
    //         return null;
    //       }
    //     }
    //   },
    // }),
  ],
};

export const {
  auth,
  handlers: { GET, POST },
  //// adding simple authorization:
  // signIn,
  // signOut,
} = NextAuth(authConfig);

import { signIn } from '@/lib/auth';

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        'use server';
        await signIn('credentials', formData);
      }}
    >
      <label>
        Email
        <input name='email' type='email' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button>Sign In</button>
    </form>
  );
}

// ///////////// Codepilot with email and pass:
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         const res = await fetch('/your/api/endpoint', {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//           headers: { 'Content-Type': 'application/json' },
//         });
//         const user = await res.json();
//         if (res.ok && user) {
//           return user;
//         }
//         return null;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       return baseUrl;
//     },
//     async session({ session, token, user }) {
//       session.user = user;
//       return session;
//     },
//     async jwt({ token, user, account, profile, isNewUser }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//   },
// });

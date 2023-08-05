import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/services/authentication';

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      id: 'credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string; password: string };
        const user = await login({ email, password });
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          user.resss = user.accessToken;
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        return {
          accessToken: user.accessToken,
        };
      }
      return token;
    },

    async session({ session, token, user }: any) {
      session.user.accessToken = token.accessToken;
      // session.user.refreshToken = token.refreshToken;
      // session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
};

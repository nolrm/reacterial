import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User as UserModel } from '@/db/models';
import bcrypt from 'bcryptjs';
import dbConnect from '@/db/config/connection';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  address: string;
  phone: string;
};

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string;
    address: string;
    phone: string;
  }

  interface Session {
    user: User;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          await dbConnect();
          
          const user = await UserModel.findOne({ email: credentials?.email });
          
          if (!user) {
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(
            credentials?.password || '',
            user.password
          );

          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            address: user.address,
            phone: user.phone
          } as any;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  // session: {
  //     jwt: true
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
        session.user.address = token.address as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
        token.address = user.address;
        token.phone = user.phone;
      }
      return token;
    },
  },
});

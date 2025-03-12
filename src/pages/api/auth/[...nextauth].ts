import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User as UserModel } from '@/db/models';
import bcrypt from 'bcryptjs';
import connectDB from '@/db/config/database';
import { UserState } from '@/redux/userSlice';
import axios from 'axios';

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

async function findOrCreateUser(user: any, sessionToken: string) {
  try {
    await connectDB();

    // Check if user exists in our database
    let dbUser = await UserModel.findOne({ email: user.email });
    console.log('dbUser', dbUser);

    // If user doesn't exist, create a new one via the API
    if (!dbUser && user.email) {
      console.log('Creating....');
      const response = await axios.post(
        `${process.env.BASE_URL}/api/users/register`,
        {
          name: user.name,
          email: user.email,
          image:
            user.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || '')}&background=random`,
          password: 'OAUTH_USER', // Special marker for OAuth users
          role: 'admin', // Default role
          address: '',
          phone: '',
        },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`, // Include the session token or other auth method
          },
        }
      );

      dbUser = response.data;
    }

    return dbUser;
  } catch (error) {
    console.error('Error in findOrCreateUser:', error);
    throw error;
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
          await connectDB();

          const user = await UserModel.findOne({ email: credentials?.email });

          console.log('user', user);

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
            phone: user.phone,
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
  session: {
    maxAge: 30 * 60, // 30 minutes
  },
  // jwt: {
  //   // Configure JWT settings here if needed
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      console.log('async session');
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
        session.user.address = token.address as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      console.log('async jwt token', token);
      // Initial sign in
      if (account && user) {
        try {
          const sessionToken = token.accessToken as string; // Ensure it's a string
          const dbUser = await findOrCreateUser(user, sessionToken);

          if (dbUser) {
            // Save user details to token
            token.id = dbUser._id.toString();
            token.name = dbUser.name;
            token.email = dbUser.email;
            token.role = dbUser.role;
            token.image = dbUser.image;
            token.address = dbUser.address;
            token.phone = dbUser.phone;
          }
        } catch (error) {
          console.error('Error in jwt callback:', error);
        }
      }
      return token;
    },
  },
});

// Example Redux action to set user data
export const setUser = (userData: Omit<UserState, 'isLoading'>) => ({
  type: 'SET_USER',
  payload: userData,
});

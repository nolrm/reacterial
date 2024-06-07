import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

console.log('process.env.GOOGLE_CLIENT_ID ', process.env.GOOGLE_CLIENT_ID)
console.log('process.env.GOOGLE_CLIENT_SECRET ', process.env.GOOGLE_CLIENT_SECRET)

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            session.userId = token.sub;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
});
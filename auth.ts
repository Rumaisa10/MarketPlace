import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/Users";
import { loginSchema } from "./libs/authSchema";

const DUMMY_HASH = "$2b$10$hsPlLWyljDpaw86NDdvFsuik2Jxt6kZHzkLd2FfQGov/cF/DUSPva";

export const {auth , signIn , signOut , handlers} = NextAuth({
    session : { strategy : 'jwt'},
    pages : { signIn : '/login'},
    providers : [
        Credentials({
            credentials: {
                email : {},
                password : {}
            },
           async authorize(credentials) {
            const parsed = loginSchema.safeParse(credentials)
            if(!parsed.success) return null
            const { email, password} = parsed.data
              
            const user = await User.findOne({ email }).lean();

        const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !ok) return null;

        return { id: String(user._id), name: user.name, email: user.email };

            },
        })
    ],
    callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
    }
})
import { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

type AuthData = {
  usedto: {
    name: string;
    email: string;
    token: string;
  };
};

interface ExtendedUser extends User {
  token: string;
}

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", requaired: true },
        password: { label: "password", type: "password", requaired: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        if (credentials) {
          return { name: "vasya", email: "vasya@gov.no" } as User;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      if (user) {
        const { data } = await axios.post<AuthData>(
          `${process.env.API_URL}/auth/loginWithGoogle`,
          {
            name: user.name,
            email: user.email,
          }
        );

        user.name = data.usedto.name;
        user.email = data.usedto.email;
        (user as ExtendedUser).token = data.usedto.token;
        return true;
      }

      if (credentials) {
        console.log(credentials);
        return true;
      }

      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = (user as ExtendedUser).token; // Приводим user к ExtendedUser
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.token = token.token;
      }
      return session;
    },
  },
};

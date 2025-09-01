import { AuthOptions, DefaultUser } from "next-auth";
import ApiService from "@/app/apiService/apiService";
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtendedUser extends DefaultUser {
  role: string;
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends ExtendedUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string;
    role?: string;
    exp?: number;
  }
}

export const authConfig: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) return null;
          const auth = new ApiService(process.env.NEXT_PUBLIC_SERVER_URL!);
          const { data, status } = await auth.post<{
            user: {
              name: string;
              email: string;
              role: string;
              _id: string;
              token: string;
            };
          }>("/auth/login", {
            email: credentials.email.toLowerCase(),
            password: credentials.password.toLowerCase(),
          });

          if (status === 200) {
            return {
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              accessToken: data.user.token,
            };
          }
          return null;
        } catch (err) {
          console.error("authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id; //? Добавил для обновления уведомлений, возможно все ляжет :)

        if (!token.exp) {
          const decoded = jwt.decode(user.accessToken) as jwt.JwtPayload;
          if (decoded && decoded.exp) {
            token.exp = decoded.exp;
            token.maxAge = decoded.exp - Math.floor(Date.now() / 1000);
          }
        }

        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.id = user.id; // ? Добавил для обновления уведомлений, возможно все ляжет :)
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.accessToken = token.accessToken!;
        session.user.id = token.id!; // ? Добавил для обновления уведомлений, возможно все ляжет :)
        if (token.exp) {
          session.expires = new Date(token.exp * 1000).toISOString();
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

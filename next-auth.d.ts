import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Добавляем id
    token: string; // Добавляем token
  }

  interface Session {
    user: User & DefaultSession["user"]; // Объединяем пользовательские данные
  }
}

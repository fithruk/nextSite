"use client";

import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "./Contexts/SocketContext/SoketContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SocketProvider>
      <SessionProvider>{children}</SessionProvider>
    </SocketProvider>
  );
}

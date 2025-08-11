import { createContext, ReactNode, useContext, useState } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  name: string;
  role: "user" | "admin";
  setSocket: (socket: Socket | null) => void;
  setName: (name: string) => void;
  setRole: (role: "user" | "admin") => void;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  name: "",
  role: "user",
  setSocket: () => {},
  setName: () => {},
  setRole: () => {},
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  return (
    <SocketContext.Provider
      value={{ socket, name, role, setSocket, setName, setRole }}
    >
      {children}
    </SocketContext.Provider>
  );
};

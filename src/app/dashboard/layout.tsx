"use client";
import { Grid } from "@mui/material";
import { ReactNode, useEffect } from "react";
import Navigation from "@/components/Navigation/Navigation";
import { io } from "socket.io-client";

export enum SocketEventsEnum {
  connect = "connect",
  getClientWhoAreTrainingNow = "getClientWhoAreTrainingNow",
  clientDisconnected = "clientDisconnected",
  newClientConnected = "newClientConnected",
  updateWorkout = "updateWorkout",
  sendUpdatedWorkoutToAdmin = "sendUpdatedWorkoutToAdmin",
}

import { useSocketContext } from "../Contexts/SocketContext/SoketContext";
import { useSession } from "next-auth/react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { setSocket, setName, setRole } = useSocketContext();

  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const name = session?.user.name;
  const role = (session?.user.role ?? "user") as "user" | "admin";

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
      withCredentials: true,
      auth: {
        token: session?.user.accessToken,
      },
      query: {
        name: session?.user.name,
        role: role,
      },
    });
    if (newSocket && name && role) {
      console.log("setting socket and name");

      setSocket(newSocket);
      setName(name);
      setRole(role);
    }
    newSocket.on(SocketEventsEnum.connect, () => {
      console.log("Connected to server with id:", newSocket.id);
    });

    newSocket.on(SocketEventsEnum.newClientConnected, (data?: string) => {
      console.log(data);
    });

    newSocket.emit(
      SocketEventsEnum.newClientConnected,
      JSON.stringify({
        name: name,
        msg: "PAPAGAY shlyapa",
      })
    );

    return () => {
      newSocket.off(SocketEventsEnum.newClientConnected);
      if (newSocket && newSocket.connected) newSocket.disconnect();
    };
  }, [token, role]);

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#B0D4FF",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
      padding={{ xs: "1vh", sm: "1vh", md: "1rem" }}
      flexWrap={"wrap"}
      spacing={{ xs: 2, md: 6 }}
    >
      <Grid size={{ md: 2 }}>
        <Navigation />
      </Grid>
      <Grid
        size={{ xs: 12, md: 10 }}
        sx={{
          "@media(max-width:600px)": {
            marginBottom: "5vh",
          },
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;

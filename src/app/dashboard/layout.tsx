"use client";
import { Grid } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import Navigation from "@/components/Navigation/Navigation";
import { io } from "socket.io-client";

export enum SocketEventsEnum {
  connect = "connect",
  getClientWhoAreTrainingNow = "getClientWhoAreTrainingNow",
  clientDisconnected = "clientDisconnected",
  newClientConnected = "newClientConnected",
  updateWorkout = "updateWorkout",
  sendUpdatedWorkoutToAdmin = "sendUpdatedWorkoutToAdmin",
  newNotification = "newNotification",
  loadNotification = "loadNotification",
  markNotificationAsReaded = "markNotificationAsReaded",
}

import { useSocketContext } from "../Contexts/SocketContext/SoketContext";
import { useSession } from "next-auth/react";
import ClientNotoficationQueue from "@/components/ClientNotifications/ClientNotifications";
import { NotificationTypes } from "@/Types/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { setSocket, setName, setRole, socket } = useSocketContext();
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const { setItem } = useLocalStorage();

  const token = session?.user.accessToken;
  const name = session?.user.name;
  const role = (session?.user.role ?? "user") as "user" | "admin";
  const userId = session?.user.id;

  const onLoadClientNotifications = (data: string) => {
    const parsedNotifications: NotificationTypes[] = JSON.parse(data);

    setNotifications((prev) => {
      if (
        prev.length === parsedNotifications.length &&
        prev.every(
          (n, i) =>
            n._id === parsedNotifications[i]._id &&
            n.isRead === parsedNotifications[i].isRead
        )
      ) {
        return prev;
      }
      return parsedNotifications;
    });
  };

  const onNotificationOpen = () => {
    setIsNotifOpen((state) => !state);
  };

  useEffect(() => {
    if (!token) return;
    setItem("authToken", token);
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
      withCredentials: true,
      auth: {
        token: token,
      },
      query: {
        name: name,
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

    newSocket.emit(SocketEventsEnum.newClientConnected);

    newSocket.on(SocketEventsEnum.loadNotification, onLoadClientNotifications);

    return () => {
      newSocket.off(SocketEventsEnum.newClientConnected);
      newSocket.off(SocketEventsEnum.loadNotification);
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
          position: "relative",
          "@media(max-width:600px)": {
            marginBottom: "5vh",
          },
        }}
      >
        {children}

        {socket && userId && (
          <ClientNotoficationQueue
            userId={userId}
            socket={socket}
            notifications={notifications}
            isNotifOpen={isNotifOpen}
            onNotificationOpen={onNotificationOpen}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;

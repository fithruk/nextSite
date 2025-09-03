import styles from "./styles.module.css";

import { NotificationTypes } from "@/Types/types";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { ReactSVG } from "react-svg";
import { AppButton } from "../UI/AppButton/AppButton";
import { Fragment, useEffect, useRef } from "react";
import { useVisibleNotifications } from "@/hooks/useVisibleNotifications ";
import { Socket } from "socket.io-client";
import { SocketEventsEnum } from "@/app/dashboard/layout";
import dayjs from "dayjs";

type ClientNotificationsProps = {
  userId: string;
  socket: Socket;
  notifications: NotificationTypes[];
  isNotifOpen: boolean;
  onNotificationOpen: () => void;
};

const Notification = ({
  title,
  message,
  isRead,
  createdAt,
  _id,
}: NotificationTypes) => {
  return (
    <Grid
      component={"div"}
      data-id={_id}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      border={"1px solid var(--blue)"}
      borderRadius={"var(--border-radius-primary)"}
      marginTop={"1rem"}
      padding={"1rem"}
      sx={{ backgroundColor: "var(--background-primary)" }}
    >
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"50%"}
        sx={{ backgroundColor: "var(--blue)" }}
        width={"3rem"}
        height={"3rem"}
      >
        {" "}
        {isRead ? (
          <ReactSVG
            src={"/images/readedNotification.svg"}
            beforeInjection={(svg) => {
              svg.setAttribute("class", styles.icon);
              svg.querySelectorAll("[fill]").forEach((el) => {
                el.removeAttribute("fill");
              });
            }}
          />
        ) : (
          <ReactSVG
            src={"/images/notification.svg"}
            beforeInjection={(svg) => {
              svg.setAttribute("class", styles.icon);
              svg.querySelectorAll("[fill]").forEach((el) => {
                el.removeAttribute("fill");
              });
            }}
          />
        )}
      </Grid>
      <Grid flexGrow={0.7} flexBasis={"50%"}>
        <Typography variant="h5" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="body2" color="var(--blue)">
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
};

const ClientNotoficationQueue = ({
  userId,
  socket,
  notifications,
  isNotifOpen,
  onNotificationOpen,
}: ClientNotificationsProps) => {
  const unreadedNotifications = notifications.filter((n) => !n.isRead);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const notificationBox = useRef<HTMLDivElement | null>(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  const visibleNotifications = useVisibleNotifications(notificationBox, [
    notifications,
    isNotifOpen,
    notificationBox.current?.offsetTop,
  ]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [notifications, isNotifOpen]);

  useEffect(() => {
    if (!socket || !userId) return;
    const dataForUpdate = { userId, visibleNotifications };
    socket.emit(
      SocketEventsEnum.markNotificationAsReaded,
      JSON.stringify(dataForUpdate)
    );
  }, [socket, userId, visibleNotifications]);

  return (
    <Grid
      container
      position={isMobile ? "fixed" : "absolute"}
      flexDirection={"column"}
      // maxHeight={"fit-content"}
      height={{ xs: isNotifOpen && isMobile ? "calc(100vh - 64px)" : "auto" }}
      width={{ xs: isNotifOpen ? "100%" : "auto", md: "25rem" }}
      padding={"1rem"}
      borderRadius={"var(--border-radius-primary)"}
      sx={{
        zIndex: 500,
        bottom: { xs: "64px", md: "5px" },
        right: { xs: 0, md: "5px" },

        backgroundColor: {
          xs: isNotifOpen ? "var(--background-secondary)" : "transparent",
          md: "var(--background-secondary)",
        },
        borderRadius: { xs: 0, md: "var(--border-radius-primary)" },
      }}
    >
      <Grid
        display={"flex"}
        justifyContent={"space-between"}
        marginBottom={isNotifOpen ? "1rem" : 0}
        sx={{
          ...(isMobile && {
            position: "relative",
            top: "1.5vh",
          }),
        }}
      >
        {" "}
        {!isMobile ? (
          <Typography variant="h5" color="info">
            Notifications {unreadedNotifications.length}
          </Typography>
        ) : (
          <div />
        )}
        <AppButton
          sx={{
            marginTop: 0,
            ...(isMobile && { position: "relative" }),
          }}
          onClick={onNotificationOpen}
        >
          {isNotifOpen ? "X" : "🠝"}
          {isMobile && unreadedNotifications.length > 0 && (
            <Box
              sx={{
                zIndex: 1,
                position: "absolute",
                right: 0,
                top: 0,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "var(--yellow)",
                color: "var(--blue)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {unreadedNotifications.length}
            </Box>
          )}
        </AppButton>
      </Grid>
      {isNotifOpen && (
        <Grid
          component={"div"}
          ref={notificationBox}
          maxHeight={isMobile ? "calc(80vh)" : "500px"}
          flexWrap={"nowrap"}
          position={"relative"}
          sx={{ overflowY: "scroll" }}
        >
          {notifications.length ? (
            notifications.map((n, i, arr) => {
              const prevNotification = arr[i - 1];
              const isNewDate =
                !prevNotification ||
                !dayjs(prevNotification.createdAt).isSame(n.createdAt, "date");

              return (
                <Fragment key={n._id}>
                  {isNewDate && (
                    <Grid
                      display="flex"
                      alignItems="center"
                      sx={{ margin: "1rem 0" }}
                    >
                      <Box flex={1} sx={{ borderBottom: "1px solid #ccc" }} />
                      <Typography
                        variant="caption"
                        sx={{
                          margin: "0 0.5rem",
                          whiteSpace: "nowrap",
                          color: "var(--text-secondary, #666)",
                          fontSize: "0.8rem",
                          backgroundColor: "var(--background-secondary)",
                          padding: "0 0.5rem",
                          borderRadius: "8px",
                        }}
                      >
                        {dayjs(n.createdAt).format("DD MMMM YYYY")}
                      </Typography>
                      <Box flex={1} sx={{ borderBottom: "1px solid #ccc" }} />
                    </Grid>
                  )}
                  <Notification {...n} />
                </Fragment>
              );
            })
          ) : (
            <Typography variant="h5" textAlign={"center"} color="info">
              There are not any notifications
            </Typography>
          )}

          <div ref={bottomRef}></div>
        </Grid>
      )}
    </Grid>
  );
};

export default ClientNotoficationQueue;

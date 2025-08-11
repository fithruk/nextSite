"use client";
import { ReactSVG } from "react-svg";
import styles from "./styles.module.css";
import {
  Box,
  BottomNavigation,
  List,
  ListItemButton,
  ListItemIcon,
  useMediaQuery,
  BottomNavigationAction,
  Grid,
} from "@mui/material";
import AppLink from "../UI/AppLink/AppLink";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Navigation = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const router = useRouter();
  const session = useSession();
  const isMobile = useMediaQuery("(max-width:600px)");

  const role = session.data?.user.role;

  const [navValue, setNavValue] = useState(0);

  const handleListItemClick = (
    event: MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const href = event.currentTarget.querySelector("a")?.href;
    setSelectedIndex(index);
    router.push(href as string);
  };

  const handleSignOut = async () => {
    // if (isSockedExist() && isSockedConnected()) {
    //   emitEvent(SocketEventsEnum.clientDisconnected);
    //   disconnectSocket();
    // }
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "#FFFFFF",
        borderRadius: "1rem",
        height: "100%",
      }}
    >
      {!isMobile && (
        <List component="nav" aria-label="main mailbox folders">
          {role === "admin" ? (
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                {
                  <ReactSVG
                    src={"/images/navigation/overview.svg"}
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                    }}
                  />
                }
              </ListItemIcon>

              <AppLink href={`/dashboard/admin/overview`}>Огляд</AppLink>
            </ListItemButton>
          ) : (
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                {
                  <ReactSVG
                    src={"/images/navigation/overview.svg"}
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                    }}
                  />
                }
              </ListItemIcon>

              <AppLink href={`/dashboard/overview`}>Огляд</AppLink>
            </ListItemButton>
          )}
          {role === "admin" ? (
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                {
                  <ReactSVG
                    src={"/images/navigation/clients.svg"}
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                    }}
                  />
                }
              </ListItemIcon>

              <AppLink href={`/dashboard/admin/clients`}>Мої клієнти</AppLink>
            </ListItemButton>
          ) : (
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                {
                  <ReactSVG
                    src={"/images/navigation/workout.svg"}
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                    }}
                  />
                }
              </ListItemIcon>

              <AppLink href={`/dashboard/workouts`}>Мої тренування</AppLink>
            </ListItemButton>
          )}
          {role === "admin" && (
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                {
                  <ReactSVG
                    src={"/images/navigation/connect.svg"}
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                    }}
                  />
                }
              </ListItemIcon>

              <AppLink href={`/dashboard/admin/socketPage`}>Сокети</AppLink>
            </ListItemButton>
          )}
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={handleSignOut}
          >
            <ListItemIcon>
              {
                <ReactSVG
                  src={"/images/navigation/profile.svg"}
                  beforeInjection={(svg) => {
                    svg.setAttribute("class", styles.icon);
                  }}
                />
              }
            </ListItemIcon>

            <AppLink href={"#"}>Logout</AppLink>
          </ListItemButton>{" "}
        </List>
      )}
      {isMobile && (
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={(_, newValue) => setNavValue(newValue)}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 64,
            zIndex: 1000,
            backgroundColor: "#fff",
            borderTop: "1px solid #ccc",
            boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)",

            "& .Mui-selected": {
              color: "var(--blue)",
            },
          }}
        >
          {role === "admin" ? (
            <BottomNavigationAction
              label="Огляд"
              sx={{
                flexDirection: "column",
                color: "inherit",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  marginTop: "4px",
                  fontWeight: 500,
                },
              }}
              icon={
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ReactSVG
                    src="/images/navigation/overview.svg"
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                      svg
                        .querySelectorAll("[fill]")
                        .forEach((el) => el.removeAttribute("fill"));
                      svg
                        .querySelectorAll("path")
                        .forEach((el) =>
                          el.setAttribute("fill", "currentColor")
                        );
                    }}
                  />
                </Grid>
              }
              component={AppLink}
              href={`/dashboard/admin/overview`}
            />
          ) : (
            <BottomNavigationAction
              label="Огляд"
              sx={{
                flexDirection: "column",
                color: "inherit",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  marginTop: "4px",
                  fontWeight: 500,
                },
              }}
              icon={
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ReactSVG
                    src="/images/navigation/overview.svg"
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                      svg
                        .querySelectorAll("[fill]")
                        .forEach((el) => el.removeAttribute("fill"));
                      svg
                        .querySelectorAll("path")
                        .forEach((el) =>
                          el.setAttribute("fill", "currentColor")
                        );
                    }}
                  />
                </Grid>
              }
              component={AppLink}
              href={`/dashboard/overview`}
            />
          )}

          {role === "admin" ? (
            <BottomNavigationAction
              label="Kлієнти"
              sx={{
                flexDirection: "column",
                color: "inherit",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  marginTop: "4px",
                  fontWeight: 500,
                },
              }}
              icon={
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ReactSVG
                    src={"/images/navigation/clients.svg"}
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                    }}
                  />
                </Grid>
              }
              component={AppLink}
              href={`/dashboard/admin/clients`}
            />
          ) : (
            <BottomNavigationAction
              label="Тренування"
              sx={{
                flexDirection: "column",
                color: "inherit",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  marginTop: "4px",
                  fontWeight: 500,
                },
              }}
              icon={
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ReactSVG
                    src={"/images/navigation/workout.svg"}
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                    }}
                  />
                </Grid>
              }
              component={AppLink}
              href={`/dashboard/workouts`}
            />
          )}
          {role === "admin" && (
            <BottomNavigationAction
              label="Сокети"
              sx={{
                flexDirection: "column",
                color: "inherit",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  marginTop: "4px",
                  fontWeight: 500,
                },
              }}
              icon={
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ReactSVG
                    src={"/images/navigation/connect.svg"}
                    beforeInjection={(svg) => {
                      svg.setAttribute("class", styles.icon);
                    }}
                  />
                </Grid>
              }
              component={AppLink}
              href={`/dashboard/admin/socketPage`}
            />
          )}
          <BottomNavigationAction
            label="Logout"
            sx={{
              flexDirection: "column",
              color: "inherit",
              "& .MuiBottomNavigationAction-label": {
                fontSize: "0.75rem",
                marginTop: "4px",
                fontWeight: 500,
              },
            }}
            onClick={handleSignOut}
            icon={
              <Grid
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {" "}
                <ReactSVG
                  src={"/images/navigation/profile.svg"}
                  beforeInjection={(svg) => {
                    svg.setAttribute("class", styles.icon);
                  }}
                />
              </Grid>
            }
            component={AppLink}
            href="#"
          />
        </BottomNavigation>
      )}
    </Box>
  );
};

export default Navigation;

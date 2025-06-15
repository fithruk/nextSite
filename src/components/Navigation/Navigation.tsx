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
    await signOut({ callbackUrl: "/login" });
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

            <AppLink
              href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/overview`}
            >
              Огляд
            </AppLink>
          </ListItemButton>
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

              <AppLink
                href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/admin/clients`}
              >
                Мої клієнти
              </AppLink>
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

              <AppLink
                href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/workouts`}
              >
                Мої тренування
              </AppLink>
            </ListItemButton>
          )}
          {/* 
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            {
              <ReactSVG
                src={"/images/navigation/profile.svg"}
                beforeInjection={(svg) => {
                  svg.setAttribute(
                    "style",
                    "width: 24px; height: 24px; fill: currentColor"
                  );
                }}
              />
            }
          </ListItemIcon>

          <AppLink
            href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/profile`}
          >
            Мої профіль
          </AppLink>
        </ListItemButton> */}
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
          onChange={(event, newValue) => setNavValue(newValue)}
          sx={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1000 }}
        >
          <BottomNavigationAction
            label="Огляд"
            sx={{
              ".MuiTypography-root": {
                display: "flex",
                alignItems: "center",
              },
            }}
            icon={
              <ReactSVG
                src={"/images/navigation/overview.svg"}
                beforeInjection={(svg) => {
                  svg.setAttribute("class", styles.icon);
                }}
              />
            }
            component={AppLink}
            href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/overview`}
          />

          {role === "admin" ? (
            <BottomNavigationAction
              label="Kлієнти"
              sx={{
                ".MuiTypography-root": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
              icon={
                <ReactSVG
                  src={"/images/navigation/clients.svg"}
                  beforeInjection={(svg) => {
                    svg.setAttribute("class", styles.icon);
                  }}
                />
              }
              component={AppLink}
              href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/admin/clients`}
            />
          ) : (
            <BottomNavigationAction
              label="Тренування"
              sx={{
                ".MuiTypography-root": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
              icon={
                <ReactSVG
                  src={"/images/navigation/workout.svg"}
                  beforeInjection={(svg) => {
                    svg.setAttribute("class", styles.icon);
                  }}
                />
              }
              component={AppLink}
              href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/workouts`}
            />
          )}

          <BottomNavigationAction
            label="Logout"
            sx={{
              ".MuiTypography-root": {
                display: "flex",
                alignItems: "center",
              },
            }}
            onClick={handleSignOut}
            icon={
              <ReactSVG
                src={"/images/navigation/profile.svg"}
                beforeInjection={(svg) => {
                  svg.setAttribute("class", styles.icon);
                }}
              />
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

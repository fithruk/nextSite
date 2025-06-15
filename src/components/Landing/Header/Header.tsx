"use client";
import logo from "../../../../public/images/logo/logo.png";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
// import Navigation from "../Navigation/Nav";
import Image from "next/image";
import { AppButton } from "@/components/UI/AppButton/AppButton";
import Hero from "../../../../public/images/hero.png";

const cards = [
  {
    id: 1,
    title: "96",
    description: "Client Satisfaction.",
    subDesc: "Our members love their results and experience",
  },
  {
    id: 2,
    title: "96",
    description: "Client Satisfaction.",
    subDesc: "Our members love their results and experience",
  },
  {
    id: 3,
    title: "96",
    description: "Client Satisfaction.",
    subDesc: "Our members love their results and experience",
  },
  {
    id: 4,
    title: "96",
    description: "Client Satisfaction.",
    subDesc: "Our members love their results and experience",
  },
];

enum ButtonsEnum {
  login = "Login",
  SignUp = "Sign up",
}

const Header = () => {
  const router = useRouter();

  const onLoginHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent === ButtonsEnum.login) {
      router.push("/login");
    } else {
      router.push("/register/step_1");
    }
  };

  return (
    <Grid minHeight={"100vh"}>
      <Grid container alignItems="center">
        <Grid size={{ xs: 6, md: 6 }}>
          <Grid
            sx={{
              position: "relative",
              height: "5rem",
              width: "5rem",
              borderRadius: "50%",
              overflow: "hidden",

              "@media(max-width: 600px)": {
                height: "15rem",
                width: "15rem",
              },
            }}
          >
            <Image
              src={logo.src}
              fill
              style={{ objectFit: "fill" }}
              alt="logo"
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 0, md: 4 }}>{/* <Navigation /> */}</Grid>
        <Grid
          size={{ xs: 6, md: 2 }}
          display={"flex"}
          justifyContent={"space-around"}
        >
          <AppButton
            sx={{ margin: 0, backgroundColor: "var(--yellow)" }}
            onClick={onLoginHandler}
          >
            {ButtonsEnum.login}
          </AppButton>
          <AppButton sx={{ margin: 0 }} onClick={onLoginHandler}>
            {ButtonsEnum.SignUp}
          </AppButton>
        </Grid>
      </Grid>
      <Grid container marginTop={{ xs: "5vh", md: "1rem" }}>
        <Grid
          size={{ xs: 12, md: 6 }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            component={"h2"}
            fontSize={{ xs: "3vh", md: "2.5rem" }}
            marginTop={{ xs: "", md: "1rem" }}
            color="var(--main-font-color)"
          >
            Achive Your
          </Typography>
          <Typography
            component={"h1"}
            fontSize={{ xs: "3vh", md: "3.5rem" }}
            marginTop={{ xs: "", md: "1rem" }}
            color="var(--yellow)"
            fontWeight={900}
            textTransform={"uppercase"}
          >
            Fitness Goals{" "}
          </Typography>
          <Typography
            component={"h2"}
            fontSize={{ xs: "3vh", md: "2.5rem" }}
            marginTop={{ xs: "", md: "1rem" }}
            color="var(--main-font-color)"
          >
            With FitMaker
          </Typography>
          <Typography
            component={"p"}
            marginTop={{ xs: "", md: "1rem" }}
            fontSize={{ xs: "2vh", md: "1rem" }}
          >
            Join the Fitmaker community and transform your fitness journey. Our
            expert coaches and personalized programs are designed to help you
            achieve your goals and exceed your expectations. Ready to make a
            change?
          </Typography>
          <Grid
            display={"flex"}
            justifyContent={"space-around"}
            sx={{ width: "-webkit-fill-available" }}
            marginTop={{ xs: "5vh", md: "1rem" }}
          >
            <AppButton sx={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
              Explore programs
            </AppButton>
            <AppButton
              sx={{
                backgroundColor: "var(--yellow)",
                paddingLeft: "5rem",
                paddingRight: "5rem",
              }}
            >
              Start your journey
            </AppButton>
          </Grid>
        </Grid>
        <Grid
          size={{ md: 6 }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "50%",
              border: "1px solid var(--yellow)",
              width: "35rem",
              height: "35rem",

              "@media(max-width:600px)": {
                display: "none",
              },
            }}
          >
            <Image
              src={Hero.src}
              alt="Hero"
              width={550}
              height={600}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: "120%",
              }}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }} marginTop={{ xs: "", md: "5rem" }}>
          {" "}
          <Box
            marginTop={{ xs: "5vh", md: "5rem" }}
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(min(200px, 100%), 1fr))",
              gap: 2,

              "@media(max-width:600px)": {
                width: "100%",
                gridTemplateColumns: "1fr",
              },
            }}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                sx={{
                  boxShadow: "none",
                  borderRadius: "initial",
                  "&:not(:last-child)": {
                    borderRight: "4px solid var(--blue)",
                  },

                  "@media(max-width: 600px)": {
                    "&:not(:last-child)": {
                      borderRight: "none",
                      borderTop: "4px solid var(--blue)",
                    },
                    "&:first-child": {
                      borderTop: "none",
                    },
                    "&:last-child": {
                      borderTop: "4px solid var(--blue)",
                    },
                  },
                }}
              >
                <CardActionArea
                  component={"div"}
                  disableRipple
                  disableTouchRipple
                  sx={{
                    height: "100%",
                    cursor: "default",
                  }}
                >
                  <CardContent sx={{ height: "100%" }}>
                    <Typography
                      variant="h5"
                      component="div"
                      fontSize={{ xs: "2.5vh", md: "1rem" }}
                    >
                      <Typography
                        fontSize={{ xs: "3vh", md: "1.5rem" }}
                        variant="h5"
                        component={"span"}
                        color="var(--yellow)"
                      >
                        {card.title}
                      </Typography>{" "}
                      {card.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontSize={{ xs: "2.5vh", md: "1rem" }}
                    >
                      {card.subDesc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;

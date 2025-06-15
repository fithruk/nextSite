import styles from "./style.module.css";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import hero from "../../../../public/images/ya.png";
import Image from "next/image";
import AppLink from "@/components/UI/AppLink/AppLink";
const cards = [
  {
    id: 1,
    title: "Loosing Weight",
    description: "Join to blyat planms and pay your fucking money",
    subDesc:
      "Start your fitness journey with our Beginner Plan. Build a strong foundation with basic workouts and essential nutrition guidance.",
    imgUrl: hero.src,
  },
  {
    id: 2,
    title: "Building Miscles",
    description: "Join to blyat planms and pay your fucking money",
    subDesc:
      "Start your fitness journey with our Beginner Plan. Build a strong foundation with basic workouts and essential nutrition guidance.",
    imgUrl: hero.src,
  },
  {
    id: 3,
    title: "Training in Home",
    description: "Join to blyat planms and pay your fucking money",
    subDesc:
      "Start your fitness journey with our Beginner Plan. Build a strong foundation with basic workouts and essential nutrition guidance.",
    imgUrl: hero.src,
  },
  {
    id: 4,
    title: "GYM Plan",
    description: "Join to blyat planms and pay your fucking money",
    subDesc:
      "Start your fitness journey with our Beginner Plan. Build a strong foundation with basic workouts and essential nutrition guidance.",
    imgUrl: hero.src,
  },
];

const Services = () => {
  return (
    <Grid
      container
      flexDirection={"column"}
      textAlign={"center"}
      marginTop={{ xs: "5vh" }}
    >
      <Typography variant="h2" fontSize={{ xs: "2.5vh", md: "1rem" }}>
        <Typography
          component={"span"}
          variant="h2"
          color="var(--blue)"
          fontSize={{ xs: "3.5vh", md: "2rem" }}
        >
          Our
        </Typography>{" "}
        <Typography
          component={"span"}
          variant="h2"
          color="var(--yellow)"
          fontSize={{ xs: "3.5vh", md: "2rem" }}
        >
          Services
        </Typography>
      </Typography>
      <Typography variant="body1" fontSize={{ xs: "2vh", md: "1.5rem" }}>
        At This Part You Can Easily access all of our servises. take a look at
        them and chose wich ever you want.
      </Typography>
      <Grid
        marginTop={{ xs: "5vh", md: "1rem" }}
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(min(200px, 100%), 1fr))",
          gap: 2,

          "@media(max-width:600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        {cards.map((card, index) => (
          <Card key={index}>
            <CardActionArea
              disableRipple
              disableTouchRipple
              sx={{
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
            >
              <Grid container display={"flex"} justifyContent={"space-between"}>
                <Grid size={{ xs: 8, md: 8 }}>
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      color="var(--blue)"
                      fontSize={{ xs: "2.5vh", md: "2rem" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      fontSize={{ xs: "2vh", md: "1rem" }}
                    >
                      {card.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize={{ xs: "1.5vh", md: "1rem" }}
                    >
                      {card.subDesc}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize={{ xs: "1.5vh", md: "1rem" }}
                    >
                      <AppLink href={"#"} style={{ alignSelf: "flex-end" }}>
                        Learn more{" "}
                      </AppLink>
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid size={{ xs: 4, md: 4 }} sx={{ position: "relative" }}>
                  <Image
                    src={card.imgUrl}
                    alt="hero"
                    height={300}
                    width={400}
                    className={styles.image}
                  />
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default Services;

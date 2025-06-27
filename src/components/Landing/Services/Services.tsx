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
    title: "Знищення жиру",
    description:
      "Забудь про зайве. Вогонь, піт, дефіцит. Готовий стати легшим — спочатку буде важко.",
    subDesc:
      "Тренування на спалення жиру, контроль калорій, трекінг прогресу. Ти не просто худнеш — ти змінюєш себе.",
    imgUrl: hero.src,
  },
  {
    id: 2,
    title: "М'язова дисципліна",
    description:
      "Це не “качалка для себе”. Це ріст через біль, залізо й повторення.",
    subDesc:
      "Програма для набору маси. Сила, базові вправи, прогресивне навантаження. Твоє тіло змінюється — якщо ти не сачкуєш.",
    imgUrl: hero.src,
  },
  {
    id: 3,
    title: "Домашня зона бойових дій",
    description:
      "Немає залу? Не відмазуйся. Простір — будь-де, зброя — твоє тіло.",
    subDesc:
      "Система домашніх тренувань без залу. Мінімум обладнання — максимум контролю. Жодних виправдань.",
    imgUrl: hero.src,
  },
  {
    id: 4,
    title: "Жорстокість у спортзалі",
    description: "Тільки зал. Тільки гантелі. Тільки брутальність.",
    subDesc:
      "Тренування в залі з акцентом на техніку, силу, контроль і прогрес. Без селфі, без піз*дєжа — тільки результат.",
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
          Обери
        </Typography>{" "}
        <Typography
          component={"span"}
          variant="h2"
          color="var(--yellow)"
          fontSize={{ xs: "3.5vh", md: "2rem" }}
        >
          свій шлях
        </Typography>
      </Typography>
      <Typography variant="body1" fontSize={{ xs: "2vh", md: "1.5rem" }}>
        Тут немає “послуг”. Тут є рішення. Ти або змінюєш себе, або далі живеш у
        комфорті, що зжирає. Один клік — і ти вже в режимі. Обирай — і готуйся
        до роботи.
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

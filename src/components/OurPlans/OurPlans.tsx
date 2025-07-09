import {
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { AppButton } from "../UI/AppButton/AppButton";

const cardsContent = [
  {
    cardTitle: "Starter Plan",
    description:
      "Для тих, хто тільки починає. Базові тренування, адаптація та системний контроль.",
    features: [
      "Персональний план на місяць",
      "Щотижневий контроль прогресу",
      "Підтримка у Telegram",
      "Навчання техніці та основам",
      "Простий трекінг виконання",
    ],
  },
  {
    cardTitle: "Zero Tolerance",
    description:
      'Тут немає "вибач, не встиг". Є або зробив, або не зробив. І це буде видно.',
    features: [
      "Жорсткий контроль кожного тренування",
      "Відстеження усіх зривів",
      "Корекція програми при кожному проєбі",
      "Пряма відповідальність перед тренером",
      "Без права на відмазки",
    ],
  },
  {
    cardTitle: "Pro Plan",
    description:
      "Для досвідчених. Робота на результат з фокусом на слабкі сторони. Постійна адаптація.",
    features: [
      "Програма під конкретну ціль",
      "Глибока аналітика прогресу",
      "Коригування кожні 2 тижні",
      "Додаткові функціональні тести",
      "Робота з навантаженнями в межі",
    ],
  },
];

type PlanCardProps = {
  cardTitle: string;
  description: string;
  features: string[];
  onClick: (message: string) => void;
};

const PlanCard = ({
  cardTitle,
  description,
  features,
  onClick,
}: PlanCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        padding: {
          xs: "1vh",
          md: "1rem",
        },
        flexDirection: "column",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cardTitle}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mt: 1 }}
          component="p"
        >
          Опис
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mt: 1 }}
          component="p"
        >
          Особливості
        </Typography>
        <ul style={{ paddingLeft: "1.2rem" }}>
          {features.map((str) => (
            <Typography key={str} component="li" variant="body2">
              {str}
            </Typography>
          ))}
        </ul>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <AppButton
          sx={{ textTransform: "uppercase", margin: 0 }}
          fullWidth
          size="small"
          onClick={() => onClick(`Я хочу дізнатися більше про ${cardTitle}`)}
        >
          дізнатися більше про {cardTitle}
        </AppButton>
      </CardActions>
    </Card>
  );
};

type OurPlansProps = {
  scrollToContact: (msg: string) => void;
};

const OurPlans = ({ scrollToContact }: OurPlansProps) => {
  return (
    <Paper
      sx={{
        margin: { xs: "1vh", md: "1rem" },
      }}
    >
      <Typography textAlign={"center"}>
        <Typography color="var(--blue)" component={"span"} variant="h4">
          {" "}
          Обери свій режим.
        </Typography>
        <Typography color="var(--yellow)" component={"span"} variant="h4">
          {" "}
          Без мотивації. Тільки дія, система і контроль
        </Typography>
      </Typography>
      <Grid container margin={{ xs: "1vh", md: "1rem" }}>
        {cardsContent.map((card, i) => (
          <Grid key={i} size={{ xs: 12, md: 4 }}>
            <PlanCard onClick={scrollToContact} {...card} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default OurPlans;

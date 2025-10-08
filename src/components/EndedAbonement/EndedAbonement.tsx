import { Paper, Typography, Stack } from "@mui/material";
import dayjs from "dayjs";

interface SubscriptionInfoProps {
  clientName: string;
  workoutsLeft: number;
  dateOfLastWorkout: Date | null;
}

const priceArr = [
  "5 тренировок - 675 грн",
  "8 тренировок - 1080 грн",
  "10 тренировок - 1350 грн",
  "12 тренировок - 1620 грн",
];

const EndedAbonement: React.FC<SubscriptionInfoProps> = ({
  clientName,
  workoutsLeft,
  dateOfLastWorkout,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: 3,
        backgroundColor: "#ffe6e6",
        border: "1px solid red",
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Typography variant="h6" fontWeight={600} textAlign="center" mb={2}>
        Абонемент клієнта: {clientName}
      </Typography>

      <Stack spacing={1} alignItems="center">
        <Typography color={"error"}>
          Тренувань залишилося: {workoutsLeft}
        </Typography>

        <Typography variant="body1" color={"error"} fontWeight={500}>
          {dateOfLastWorkout
            ? `Останнє тренування було ${dayjs(dateOfLastWorkout).format(
                "DD.MM.YYYY"
              )}`
            : "Ти ще не купував абонемент"}
        </Typography>
        <Typography color={"info"}>Текущие цены :</Typography>
        {priceArr.map((price) => (
          <Typography key={price} color={"info"}>
            {price}
          </Typography>
        ))}
      </Stack>
    </Paper>
  );
};

export default EndedAbonement;

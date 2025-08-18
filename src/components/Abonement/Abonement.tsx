import { Box, SnackbarContent, Stack, Typography } from "@mui/material";
import { AppBox } from "../UI/AppBox/AppBox";
import dayjs from "dayjs";
import { WKStatTypes } from "@/app/dashboard/workouts/page";
import { AbonDataTypes } from "@/Types/types";
import { WorkoutEvent } from "../Calendar/Calendar";

type AbonementTypes = {
  wkStat?: WKStatTypes | null;
  abonData: AbonDataTypes | null;
  event: WorkoutEvent | null;
};

const Abonement = ({ wkStat, abonData, event }: AbonementTypes) => {
  return (
    <AppBox>
      <Box
        sx={{
          padding: "1rem",
          background: "linear-gradient(135deg, var(--blue),var(--yellow))",
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          minHeight: "clamp(4vh, 315px, 6rem)",
        }}
      >
        <Typography component={"h4"} color="#FFFFFF" marginTop={"1rem"}>
          Кількість тренувань, які залишилися: <br />
          <Typography component={"span"} variant="h3">
            {" "}
            {abonData?.abonementDuration}
          </Typography>
        </Typography>
        <Box marginTop={"2rem"} alignSelf={"flex-end"}>
          <Typography component={"h4"} color="#FFFFFF">
            Тривалість абонементу :
            {dayjs(abonData?.dateOfCreation).format("DD.MM")} -{" "}
            {dayjs(abonData?.dateOfCreation).add(35, "day").format("DD.MM")}
          </Typography>
        </Box>
      </Box>
      <Stack spacing={2} sx={{ marginTop: { xs: "1vh", md: "1rem" } }}>
        {event && (
          <SnackbarContent
            sx={{
              borderRadius: "1rem",
              backgroundColor: "var(--blue)",

              "@media(max-width: 600px)": {
                ".MuiSnackbarContent-message .MuiTypography-root": {
                  fontSize: "4vw",
                },
              },
            }}
            message={
              <Typography component={"h4"}>
                Тренувань всього, починаючи з{" "}
                {dayjs(event.start).format("DD.MM.YYYY").toString()}(
                {wkStat?.wkAmount})
              </Typography>
            }
          />
        )}
      </Stack>
    </AppBox>
  );
};

export default Abonement;

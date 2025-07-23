import ApiService from "@/app/apiService/apiService";
import { OverviewRespType } from "@/app/dashboard/overview/page";
import Chart, { ChartNamesEnum } from "@/components/Chart/Chart";
import FutureWorkoutPlan from "@/components/FuturePlanWorkout/FutureWorkoutPlan";
import TipsRandom from "@/components/TipsRandom/TipsRTandom";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import { WplanRespTypes } from "@/Types/types";
import { Alert, Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

type CommonStatisticsTypes = OverviewRespType & {
  apiApiservice: ApiService;
  clientName: string;
};

const CommonStatistics = ({
  abonement,
  totalWorkouts,
  totalReps,
  strengthProgression,
  workoutDates,
  apiApiservice,
  clientName,
}: CommonStatisticsTypes) => {
  const endOfAbonIsClose =
    dayjs().diff(dayjs(abonement?.dateOfCreation), "day") > 35;
  const endDate = dayjs(abonement?.dateOfCreation).add(40, "day");

  const [wplan, setWplan] = useState<WplanRespTypes | null | string>();

  useEffect(() => {
    if (!workoutDates?.length) return;

    (async () => {
      const datesCopy = [...workoutDates];

      let lastWorkoutDate = datesCopy.pop();

      const isToday = dayjs().isSame(dayjs(lastWorkoutDate), "day");

      if (datesCopy.includes(dayjs().toDate()) && !isToday) {
        lastWorkoutDate = dayjs().toDate();
      }

      const { data, status } = await apiApiservice.post<{
        workoutPlan: WplanRespTypes;
      }>("/workouts/getWorkoutPlan", {
        dateOfWorkout: lastWorkoutDate,
        clientName,
      });

      if (status === 200) {
        setWplan(data.workoutPlan);
      } else {
        setWplan("План тренування поки не готовий");
      }
    })();
  }, [workoutDates, clientName]);

  return (
    <AppBox>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid size={12} display={"flex"} justifyContent={"space-around"}>
          {" "}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Typography variant="body1" component={"p"}>
              Усього тренувань
            </Typography>
            <Typography component={"p"} variant={"h5"}>
              {totalWorkouts}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Typography component={"p"}>
              Було виконано розвиваючих повторень
            </Typography>
            <Typography component={"p"} variant={"h5"}>
              {totalReps}
            </Typography>
          </Box>
        </Grid>
        <Grid size={12}>
          {endOfAbonIsClose && (
            <Alert severity="warning">
              Aбонемент закінчиться {endDate.format("DD.MM.YYYY")}
            </Alert>
          )}
        </Grid>
        <Grid size={12}>
          <Chart
            chartType={ChartNamesEnum.strengthProgressionByExercise}
            data={{ strengthProgressionByExercise: strengthProgression ?? [] }}
          />
        </Grid>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          flexBasis={"100%"}
        >
          <Grid size={{ xs: 12, md: 6 }} flexGrow={1}>
            <AppBox sx={{ border: "1px solid grey" }}>
              <Typography variant="h6">Майбутнє тренування</Typography>
              {wplan && typeof wplan === "object" ? (
                <FutureWorkoutPlan wplan={wplan} />
              ) : (
                <Typography variant="subtitle1" color="info">
                  {" "}
                  План наступного тренування поки не готовий
                </Typography>
              )}
            </AppBox>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} flexGrow={1}>
            <AppBox sx={{ border: "1px solid grey" }}>
              <TipsRandom />
            </AppBox>
          </Grid>{" "}
        </Grid>
      </Grid>
    </AppBox>
  );
};
export default CommonStatistics;

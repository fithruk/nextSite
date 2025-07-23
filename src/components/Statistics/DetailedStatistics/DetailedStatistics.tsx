import { OverviewRespType } from "@/app/dashboard/overview/page";
import Chart, { ChartNamesEnum } from "@/components/Chart/Chart";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

type DetailedStatisticsprops = OverviewRespType;

const DetailedStatistics = ({
  tonnagePerWorkout,
  maxWeights,
  frequentMuscleGroups,
  abonement,
}: DetailedStatisticsprops) => {
  const maxWeightsArray = Object.entries(maxWeights ?? {});

  return (
    <AppBox width="100%" sx={{ p: { xs: 2, md: 3 } }}>
      {" "}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{ justifyContent: "center" }}
      >
        {" "}
        <Grid container flexDirection={"column"} size={{ xs: 12, md: 6 }}>
          <Grid size={12}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
              {" "}
              <Typography variant="h6" gutterBottom>
                Групи м'язів, що часто використовуються
              </Typography>
              <Chart
                chartType={ChartNamesEnum.frequentMuscleGroups}
                data={{ frequentMuscleGroups: frequentMuscleGroups ?? {} }}
              />
            </Paper>
          </Grid>
          <Grid size={12}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                mt: { xs: 2, md: 4 },
              }}
            >
              {" "}
              <Typography variant="h6" gutterBottom>
                Тоннаж з тренувань
              </Typography>
              <Chart
                chartType={ChartNamesEnum.tonnagePerWorkout}
                data={{ tonnagePerWorkout: tonnagePerWorkout ?? [] }}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container flexDirection={"column"} size={{ xs: 12, md: 3 }}>
          <Grid>
            <Paper
              elevation={3}
              sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, height: "100%" }}
            >
              <Typography variant="h6" textAlign={"start"} gutterBottom>
                Мої цілі
              </Typography>
              <Typography variant="body2" textAlign={"start"} gutterBottom>
                Функціонал розробляється
              </Typography>
              {/* <List dense>
                {" "}
                {Array.from({ length: 4 })
                  .fill("Цель")
                  .map((goal, i) => (
                    <ListItem key={i} disablePadding>
                      <ListItemText primary={`${goal} ${i + 1}`} />
                    </ListItem>
                  ))}
              </List> */}
            </Paper>
          </Grid>
          <Grid>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                height: "100%",
                mt: { xs: 2, md: 4 },
              }}
            >
              {" "}
              <Typography variant="h6" textAlign={"start"} gutterBottom>
                Найкращі результати
              </Typography>
              <List dense>
                {maxWeightsArray
                  .sort((a, b) => b[1] - a[1])
                  .map(([name, value]) => (
                    <ListItem key={name} disablePadding>
                      <ListItemText primary={`${name} - ${value} (кг)`} />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Grid container flexDirection={"column"} size={{ xs: 12, md: 3 }}>
          <Grid>
            <Paper
              elevation={3}
              sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, height: "100%" }}
            >
              <Typography variant="h6" textAlign={"start"} gutterBottom>
                Нагадування
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Занять залишилося:{" "}
                <Typography component="span" fontWeight="bold">
                  {abonement?.abonementDuration}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Дата створення:{" "}
                <Typography component="span" fontWeight="bold">
                  {dayjs(abonement?.dateOfCreation).format("DD.MM.YYYY")}
                </Typography>
              </Typography>
              {abonement?.dateOfCreation && (
                <Typography variant="body2" color="text.secondary">
                  Гранична дата закінчення:{" "}
                  <Typography component="span" fontWeight="bold">
                    {dayjs(abonement.dateOfCreation)
                      .add(40, "day")
                      .format("DD.MM.YYYY")}
                  </Typography>
                </Typography>
              )}
            </Paper>
          </Grid>
          <Grid>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                height: "100%",
                mt: { xs: 2, md: 4 },
              }}
            >
              {" "}
              <Typography variant="h6" textAlign={"start"} gutterBottom>
                Нагороди
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Місце для майбутніх досягнень!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </AppBox>
  );
};

export default DetailedStatistics;

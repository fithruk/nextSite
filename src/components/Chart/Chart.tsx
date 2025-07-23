import { Box, Typography } from "@mui/material";
import {
  createStrengthProgressionByExerciseConfig,
  createTonnagePerWorkoutConfig,
  createfrequentMuscleGroupstConfig,
} from "../../../configs/chartConfig";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart, RadarChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { useState, MouseEvent } from "react";
import { AppButton } from "../UI/AppButton/AppButton";

export enum ChartNamesEnum {
  strengthProgressionByExercise = "strengthProgressionByExercise",
  frequentMuscleGroups = "frequentMuscleGroups",
  tonnagePerWorkout = "tonnagePerWorkout",
}

type ChartData = {
  strengthProgressionByExercise?: {
    exercise: string;
    date: string;
    averageWeight: number;
  }[];
  frequentMuscleGroups?: Record<string, number>;
  tonnagePerWorkout?: { date: string; tonnage: Record<string, number> }[];
};

type ChartTypes = {
  chartType: ChartNamesEnum;
  data: ChartData;
};

const Chart = ({ chartType, data }: ChartTypes) => {
  const [tonnagePerWorkoutGroupe, setTonnagePerWorkoutGroupe] = useState<
    "day" | "week" | "month"
  >("day");
  console.log(tonnagePerWorkoutGroupe);

  const handleTonnage = (e: MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value as
      | "day"
      | "week"
      | "month";
    setTonnagePerWorkoutGroupe(value);
  };

  switch (chartType) {
    case ChartNamesEnum.strengthProgressionByExercise:
      return (
        <>
          <Typography variant="h6" gutterBottom>
            Динаміка зміни робочого навантаження під час тренувань
          </Typography>
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box
              sx={{
                "@media(max-width:600px)": {
                  minWidth: "800px",
                },
              }}
            >
              <LineChart
                {...createStrengthProgressionByExerciseConfig(
                  data.strengthProgressionByExercise ?? []
                )}
              />
            </Box>
          </Box>
        </>
      );

    case ChartNamesEnum.frequentMuscleGroups:
      return (
        <>
          <RadarChart
            {...createfrequentMuscleGroupstConfig(data.frequentMuscleGroups!)}
          />
        </>
      );

    case ChartNamesEnum.tonnagePerWorkout:
      const groupedData = [...data.tonnagePerWorkout!];
      let chartData;
      if (tonnagePerWorkoutGroupe === "day") {
        const dayMap = new Map<string, number>();

        groupedData.forEach((workout) => {
          if (!workout?.date || !workout?.tonnage) return;

          const dayKey = dayjs(workout.date).format("YYYY-MM-DD");
          const tonnageSum = Object.values(workout.tonnage).reduce(
            (acc, val) => acc + val,
            0
          );

          if (dayMap.has(dayKey)) {
            dayMap.set(dayKey, dayMap.get(dayKey)! + tonnageSum);
          } else {
            dayMap.set(dayKey, tonnageSum);
          }
        });

        const newData = Array.from(dayMap.entries()).map(([day, tonnage]) => ({
          date: day,
          tonnage,
        }));

        chartData = newData;
      }

      if (tonnagePerWorkoutGroupe === "week") {
        const weekMap = new Map<number, number>();

        groupedData.forEach((workout) => {
          const week = dayjs(workout.date).week();
          const tonnageSum = Object.values(workout.tonnage).reduce(
            (acc, val) => acc + val,
            0
          );

          if (weekMap.has(week)) {
            weekMap.set(week, weekMap.get(week)! + tonnageSum);
          } else {
            weekMap.set(week, tonnageSum);
          }
        });

        const newData = Array.from(weekMap.entries()).map(
          ([week, tonnage]) => ({
            date: `Week ${week}`,
            tonnage,
          })
        );

        chartData = newData;
      }

      if (tonnagePerWorkoutGroupe === "month") {
        const monthMap = new Map<string, number>();
        groupedData.forEach((workout) => {
          if (!workout?.date || !workout?.tonnage) return;

          const monthKey = dayjs(workout.date).format("YYYY-MM");
          const tonnageSum = Object.values(workout.tonnage).reduce(
            (acc, val) => acc + val,
            0
          );

          if (monthMap.has(monthKey)) {
            monthMap.set(monthKey, monthMap.get(monthKey)! + tonnageSum);
          } else {
            monthMap.set(monthKey, tonnageSum);
          }
        });

        const newData = Array.from(monthMap.entries()).map(
          ([month, tonnage]) => ({
            date: month,
            tonnage,
          })
        );

        chartData = newData;
      }
      return (
        <>
          <Typography variant="h6">Загальний обсяг тренування (Кг)</Typography>
          <Box>
            <AppButton onClick={handleTonnage} type="button" value={"day"}>
              Tonnage Per Day
            </AppButton>
            <AppButton onClick={handleTonnage} type="button" value={"week"}>
              Tonnage Per Week
            </AppButton>
            <AppButton onClick={handleTonnage} type="button" value={"month"}>
              Tonnage Per Month
            </AppButton>
            <BarChart
              {...createTonnagePerWorkoutConfig(
                chartData!,
                tonnagePerWorkoutGroupe
              )}
            />
          </Box>
        </>
      );
    default:
      break;
  }
};

export default Chart;

import ApiService from "@/app/apiService/apiService";

import { usePlanPercentages } from "@/hooks/usePlanPercentages";
import {
  ExerciseResult,
  PlannedValueTypes,
  WplanRespTypes,
} from "@/Types/types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

type OneSet = {
  numberOfSet: number;
  numberOfreps: number;
  weightValue: number;
  _id: string;
};

type SetsAndValuesResults = {
  [exerciseName: string]: OneSet[];
};

type WorkoutResponse = {
  _id: string;
  __v: number;
  clientName: string;
  dateOfWorkout: string; // ISO строка даты
  workoutResult: SetsAndValuesResults;
};

type ComplitedExercisesArrayType = ExerciseResult[];

const PassedWorkout = ({
  apiService,
  eventDate,
  name,
}: {
  apiService: ApiService;
  eventDate: Date;
  name: string;
}) => {
  const [complitedExersices, setComplitedExersices] =
    useState<ComplitedExercisesArrayType>([]);
  const [plannedValue, setPlannedValues] = useState<PlannedValueTypes[]>([]);

  const {
    getComplitedPlanPercentages,
    getMinMaxRepsRangeString,
    getMinMaxWeigthRangeString,
  } = usePlanPercentages();

  useEffect(() => {
    (async () => {
      try {
        const [complitedExSerp, plannesExResp] = await Promise.all([
          apiService.get<{ workoutResponce: WorkoutResponse }>(
            `/workouts/getWorkoutResults/${encodeURIComponent(
              name
            )}/${encodeURIComponent(eventDate.toString())}`
          ),
          apiService.post<{
            workoutPlan: WplanRespTypes;
          }>("/workouts/getWorkoutPlan", {
            dateOfWorkout: eventDate,
            clientName: name,
          }),
        ]);

        if (complitedExSerp.status === 200) {
          const resultsArr = Object.entries(
            complitedExSerp.data.workoutResponce.workoutResult
          ).map((ex) => ({ exerciseName: ex[0], sets: ex[1] }));

          setComplitedExersices(resultsArr);
        }

        if (plannesExResp.status === 200) {
          const percentage = plannesExResp.data.workoutPlan.workoutPlan.map(
            (ex) => ({
              exName: ex.exercise,
              tonnage: ex.sets * ex.reps * ex.weight,
            })
          );
          setPlannedValues(percentage);
        }
      } catch (error) {
        console.log((error as Error).message);

        setPlannedValues([]);
        setComplitedExersices([]);
      }
    })();
  }, [eventDate]);

  const workoutWasUncomplitted = (
    <Typography variant="subtitle2" color="error" textAlign={"center"}>
      ТРЕНУВАННЯ БУЛО ПРОІГНОРОВАНО. Ти платиш, щоб дивитися, як йде результат?
      Непоганий план, брат.
    </Typography>
  );

  return (
    <TableContainer component={Paper}>
      {complitedExersices.length !== 0 ? (
        <Typography color="info" variant="h4">
          Тренування було завершено
        </Typography>
      ) : (
        <Typography color="error" variant="h4" textAlign={"center"}>
          Кожен пропуск тренування – це +1 день до тіла, від якого ти біжиш.
        </Typography>
      )}
      {complitedExersices.length !== 0 ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Вправа</TableCell>
              <TableCell align="right">Підходи</TableCell>
              <TableCell align="right">Повторення</TableCell>
              <TableCell align="right">Вага</TableCell>
              <TableCell align="right">Виконано на (%) від плану</TableCell>
            </TableRow>
          </TableHead>
          {
            <TableBody>
              {complitedExersices.map((row) => (
                <TableRow
                  key={row.exerciseName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.exerciseName}
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption" color="text.secondary">
                      {row.sets.length}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption" color="text.secondary">
                      {getMinMaxRepsRangeString(row)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption" color="text.secondary">
                      {getMinMaxWeigthRangeString(row)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                      >
                        {`${Math.round(
                          getComplitedPlanPercentages(row, plannedValue)
                        )}%`}
                      </Typography>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
        </Table>
      ) : (
        workoutWasUncomplitted
      )}
    </TableContainer>
  );
};

export default PassedWorkout;

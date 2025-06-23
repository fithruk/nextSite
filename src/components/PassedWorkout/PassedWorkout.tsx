import ApiService from "@/app/apiService/apiService";
import { WplanRespTypes } from "@/app/dashboard/workouts/page";

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

type ExerciseResult = {
  exerciseName: string;
  sets: OneSet[];
};

type ComplitedExercisesArrayType = ExerciseResult[];

type PlannedValueTupes = {
  exName: string;
  tonnage: number;
};

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
  const [plannedValue, setPlannedValues] = useState<PlannedValueTupes[]>([]);
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

  return (
    <TableContainer component={Paper}>
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
                  {(() => {
                    const reps = row.sets.map((set) => set.numberOfreps);
                    const min = Math.min(...reps);
                    const max = Math.max(...reps);
                    return min === max ? `${min}` : `${min} - ${max}`;
                  })()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="caption" color="text.secondary">
                  {(() => {
                    const weigth = row.sets.map((set) => set.weightValue);
                    const min = Math.min(...weigth);
                    const max = Math.max(...weigth);
                    return min === max ? `${min}` : `${min} - ${max}`;
                  })()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {(() => {
                  const executedTonnage = row.sets.reduce(
                    (value, set) => value + set.numberOfreps * set.weightValue,
                    0
                  );
                  const plannedTonnage = plannedValue.find(
                    (ex) => ex.exName === row.exerciseName
                  )?.tonnage;

                  const executedPercents =
                    (executedTonnage / plannedTonnage!) * 100;
                  return (
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      {`${Math.round(executedPercents)}%`}
                    </Typography>
                  );
                })()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PassedWorkout;

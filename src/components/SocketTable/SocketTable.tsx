import {
  PlannedValueTypes,
  WorkoutResultType,
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
import { usePlanPercentages } from "@/hooks/usePlanPercentages";

type SocketTableProps = {
  wPlans: WplanRespTypes[];
  clientWhoAreTrainingNow: WorkoutResultType[];
};

import { ExerciseResult } from "@/Types/types";

const SocketTable = ({ wPlans, clientWhoAreTrainingNow }: SocketTableProps) => {
  const {
    getMinMaxWeigthRangeString,
    getMinMaxRepsRangeString,
    getComplitedPlanPercentages,
  } = usePlanPercentages();

  const rows = clientWhoAreTrainingNow.map((user) => ({
    ...user,
    workoutResult: Object.entries(user.workoutResult),
  }));

  return (
    <TableContainer
      component={Paper}
      sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}
    >
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Підключені користувачі
      </Typography>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="connected users table"
        size="small"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Exercises
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => {
            const exercises: ExerciseResult[] = row.workoutResult.map(
              (array) => ({
                exerciseName: array[0],
                sets: array[1],
              })
            );
            // console.log(exercises);

            return (
              <TableRow
                key={row.clientName}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? "#fafafa" : "white",
                  "&:hover": { backgroundColor: "#f0f7ff" },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  {row.clientName}
                </TableCell>
                <TableCell align="right" sx={{ p: 0 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#e8f4ff" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Exercise
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Current Set
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          Weight Range
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          Reps Range
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          Completed %
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {exercises.map((ex) => {
                        const hasSets = ex.sets && ex.sets.length > 0;

                        const exPlan = wPlans
                          .find((pl) => pl.clientName === row.clientName)
                          ?.workoutPlan.find(
                            (erx) => erx.exercise === ex.exerciseName
                          );

                        const plannedValue: PlannedValueTypes[] = [
                          {
                            exName: ex.exerciseName,
                            tonnage:
                              (exPlan?.reps ?? 0) *
                              (exPlan?.weight ?? 0) *
                              (exPlan?.sets ?? 0),
                          },
                        ];

                        return (
                          <TableRow key={ex.exerciseName}>
                            <TableCell>{ex.exerciseName}</TableCell>
                            <TableCell>{ex.sets.length}</TableCell>
                            <TableCell align="right">
                              {hasSets ? getMinMaxWeigthRangeString(ex) : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {hasSets ? getMinMaxRepsRangeString(ex) : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {hasSets
                                ? `${getComplitedPlanPercentages(
                                    ex,
                                    plannedValue
                                  ).toFixed(1)}%`
                                : "-"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SocketTable;

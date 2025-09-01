import { CombinedWorkoutData } from "@/Types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { usePlanPercentages } from "@/hooks/usePlanPercentages";
import dayjs from "dayjs";
import { Fragment, useState } from "react";

type DisplayingPassedWorkoutsType = {
  workoutData: CombinedWorkoutData[];
};

const DisplayingPassedWorkouts = ({
  workoutData,
}: DisplayingPassedWorkoutsType) => {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);
  const {
    getMinMaxRepsRangeString,
    getMinMaxWeigthRangeString,
    getComplitedPlanPercentages,
  } = usePlanPercentages();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Иконка ебучая</TableCell>
            <TableCell>Групи м'язів</TableCell>
            <TableCell align="right">DateOfWorkout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workoutData.map((row, index) => {
            // console.log(row);

            return (
              <Fragment key={index}>
                <TableRow
                  onClick={() =>
                    setOpenRowIndex(index === openRowIndex ? null : index)
                  }
                >
                  <TableCell>
                    <IconButton size="small">
                      {openRowIndex === index ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {[
                      ...new Set(
                        ...[row.workoutPlan.map((ex) => ex.musclesGroup)]
                      ),
                    ].join("/")}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(row.dateOfWorkout).format("DD.MM.YYYY").toString()}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRowIndex === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={2}>
                        <Typography variant="h6">Деталі тренування</Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Вправа</TableCell>
                              <TableCell>Підхід</TableCell>
                              <TableCell>Повтори</TableCell>
                              <TableCell>Вага</TableCell>
                              <TableCell>Виконано в (%) від плану</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.workoutResult ? (
                              Object.entries(row.workoutResult).map(
                                ([exerciseName, exerciseSets], i) => {
                                  const exPlan = row.workoutPlan.find(
                                    (ex) => ex.exercise == exerciseName
                                  );

                                  const exPlanTonnage = {
                                    exName: exPlan?.exercise ?? "",
                                    tonnage:
                                      (exPlan?.reps ?? 0) *
                                      (exPlan?.weight ?? 0) *
                                      (exPlan?.sets ?? 0),
                                  };
                                  return (
                                    <TableRow key={`${exerciseName}-${i}`}>
                                      <TableCell>{exerciseName}</TableCell>
                                      <TableCell>
                                        {exerciseSets.length}
                                      </TableCell>
                                      <TableCell>
                                        {getMinMaxRepsRangeString({
                                          exerciseName,
                                          sets: exerciseSets,
                                        })}
                                      </TableCell>
                                      <TableCell>
                                        {getMinMaxWeigthRangeString({
                                          exerciseName,
                                          sets: exerciseSets,
                                        })}
                                      </TableCell>
                                      <TableCell>
                                        {getComplitedPlanPercentages(
                                          { exerciseName, sets: exerciseSets },
                                          [exPlanTonnage]
                                        ).toFixed(1)}
                                        %
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                              )
                            ) : (
                              <TableRow>
                                <TableCell>
                                  <Typography component={"span"} color="error">
                                    -
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component={"span"} color="error">
                                    -
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component={"span"} color="error">
                                    -
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component={"span"} color="error">
                                    -
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component={"span"} color="error">
                                    -
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayingPassedWorkouts;
{
  /* <TableRow key={`${exerciseName}-${i}`}>
  <TableCell>{exerciseName}</TableCell>
  <TableCell>{set.numberOfSet}</TableCell>
  <TableCell>{set.numberOfreps}</TableCell>
  <TableCell>{set.weightValue}</TableCell>
</TableRow>; */
}

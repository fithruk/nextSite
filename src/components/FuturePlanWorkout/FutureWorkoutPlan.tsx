import { WplanRespTypes } from "@/Types/types";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

type FutureWorkoutPlanProps = {
  wplan: WplanRespTypes;
};

const FutureWorkoutPlan = ({ wplan }: FutureWorkoutPlanProps) => {
  const muscleGroups = [
    ...new Set(
      wplan?.workoutPlan.map(
        (ex) =>
          ex.musclesGroup.charAt(0).toUpperCase() + ex.musclesGroup.slice(1)
      )
    ),
  ].join("/");

  const exercisesList = wplan?.workoutPlan.map((ex) => ex.exercise);

  return (
    <Box>
      <div>
        <Typography variant="body2" component={"span"}>
          М'язові групи:
        </Typography>
        <Typography component={"span"} color="info">
          {" "}
          {muscleGroups}
        </Typography>
      </div>
      <div>
        <Typography component={"span"}>Дата тренування: </Typography>
        <Typography variant="body2" color="info" component={"span"}>
          {dayjs(wplan?.dateOfWorkout).format("DD.MM.YYYY")}
        </Typography>
      </div>
      <div>
        Вправи:
        {exercisesList?.map((ex) => (
          <Typography
            key={ex}
            component={"p"}
            color="info"
            paddingLeft={"0.5rem"}
          >
            {ex}
          </Typography>
        ))}
      </div>
    </Box>
  );
};

export default FutureWorkoutPlan;

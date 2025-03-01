import { ExerciceShortType } from "@/types/types";
import exerciseShortStyles from "./exerciseShort.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";

type ExerciseShortType = {
  exercise: ExerciceShortType;
};

const ExerciseShort = ({ exercise }: ExerciseShortType) => {
  return (
    <div className={exerciseShortStyles.card}>
      <div className={exerciseShortStyles.imgContainer}>
        <img
          className={exerciseShortStyles.titleImg}
          src={exercise.imageUrl}
          alt={exercise.exerciseName}
        />
      </div>
      <Typography type="p">{exercise.exerciseName}</Typography>
      <Typography type="p">equipment {exercise.equipment}</Typography>
      <Typography type="p">difficulty {exercise.difficulty}</Typography>
    </div>
  );
};

export default ExerciseShort;

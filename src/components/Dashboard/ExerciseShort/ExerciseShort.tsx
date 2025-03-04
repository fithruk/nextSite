import { ExerciceShortType } from "@/types/types";
import exerciseShortStyles from "./exerciseShort.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";

type ExerciseShortType = {
  exercise: ExerciceShortType;
  isPicked: boolean;
  handleClick: (exercise: ExerciceShortType) => void;
};

const ExerciseShort = ({
  exercise,
  isPicked,
  handleClick,
}: ExerciseShortType) => {
  const classNames = isPicked
    ? `${exerciseShortStyles.cart} ${exerciseShortStyles.picked}`
    : `${exerciseShortStyles.cart}`;
  return (
    <div className={classNames} onClick={() => handleClick(exercise)}>
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

import { MouseEvent } from "react";
import { ExerciceShortType } from "@/types/types";
import { muscleGroupImages } from "./images";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import btnStyles from "../../../CommonComponents/Button/button.module.css";
import exSelectStyles from "./exerciseSelect.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";

type ExerciseSelectTypes = {
  exercises: ExerciceShortType[];
};

const ExerciseSelect = ({ exercises }: ExerciseSelectTypes) => {
  const muscleGroupes = new Set(
    exercises.map((ex) => ex.exerciseMuscleGroup).filter((g) => g !== null)
  );

  const onClickHandle = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.dataset.filterBy);
  };

  return (
    <div>
      {Array.from(muscleGroupes).map((gr) => (
        <AppButton
          type="button"
          key={gr}
          variant="exercise"
          onClick={onClickHandle}
          data-filter-by={gr}
          classNames={btnStyles.exerciseButtonAtcive}
        >
          {
            <>
              <img
                className={`${exSelectStyles.exerciseImg}`}
                src={muscleGroupImages[gr].src}
              />
              <Typography type="p">{gr}</Typography>
            </>
          }
        </AppButton>
      ))}
    </div>
  );
};

export default ExerciseSelect;

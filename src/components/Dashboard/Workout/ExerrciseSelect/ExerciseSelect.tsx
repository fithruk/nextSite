import { MouseEvent } from "react";
import { ExerciceShortType } from "@/types/types";
import { muscleGroupImages } from "./images";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import exSelectStyles from "./exerciseSelect.module.css";

type ExerciseSelectTypes = {
  exercises: ExerciceShortType[];
};

const ExerciseSelect = ({ exercises }: ExerciseSelectTypes) => {
  const muscleGroupes = new Set(
    exercises.map((ex) => ex.exerciseMuscleGroup).filter((g) => g !== null)
  );

  const onClickHandle = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.dataset.muscleGroup);
  };

  return (
    <div>
      {Array.from(muscleGroupes).map((gr) => (
        <AppButton
          type="button"
          key={gr}
          variant="exercise"
          onClick={onClickHandle}
          data-muscle-group={gr}
        >
          {
            <>
              <img
                className={`${exSelectStyles.exerciseImg} ${exSelectStyles.imageActive}`}
                src={muscleGroupImages[gr].src}
              />
              <p>{gr}</p>
            </>
          }
        </AppButton>
      ))}
    </div>
  );
};

export default ExerciseSelect;

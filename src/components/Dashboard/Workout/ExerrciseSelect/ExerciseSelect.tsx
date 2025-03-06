import { Dispatch, MouseEvent } from "react";
import { ExerciceShortType } from "@/types/types";
import { muscleGroupImages } from "./images";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import btnStyles from "../../../CommonComponents/Button/button.module.css";
import exSelectStyles from "./exerciseSelect.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { ActionType, ExerciseActions } from "@/reducers/exercisesReducer";
import ExerciseShort from "../../ExerciseShort/ExerciseShort";
import { IUseWorkout } from "@/types/types";

type ExerciseSelectTypes = {
  allExercises: ExerciceShortType[];
  filteredExercises: ExerciceShortType[];
  dispatch: Dispatch<ActionType>;
  workout: IUseWorkout;
};

const ExerciseSelect = ({
  allExercises,
  filteredExercises,
  dispatch,
  workout,
}: ExerciseSelectTypes) => {
  const muscleGroupes = new Set(
    allExercises.map((ex) => ex.exerciseMuscleGroup).filter((g) => g !== null)
  );

  const onClickHandle = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.filterBy) {
      dispatch({
        type: ExerciseActions.addFilter,
        payload: e.currentTarget.dataset.filterBy,
      });
    }
  };

  const addOrRemoveExercise = (exercise: ExerciceShortType) => {
    const ind: number = workout
      .getWorkoutData()
      .userExercises.findIndex((e) => e.exerciseName === exercise.exerciseName);

    if (ind === -1) {
      workout.addNewExercise(exercise);
    } else {
      workout.removeExercise(exercise);
    }
  };

  return (
    <div>
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
      <div className={exSelectStyles.cardsWrapper}>
        {filteredExercises
          .sort((a, b) => {
            const isASelected = workout
              .getWorkoutData()
              .userExercises.some((x) => x.exerciseName === a.exerciseName);
            const isBSelected = workout
              .getWorkoutData()
              .userExercises.some((x) => x.exerciseName === b.exerciseName);

            return Number(isBSelected) - Number(isASelected);
          })
          .map((ex) => (
            <ExerciseShort
              key={ex.id}
              exercise={ex}
              isPicked={workout
                .getWorkoutData()
                .userExercises.some((x) => x.exerciseName === ex.exerciseName)}
              handleClick={addOrRemoveExercise}
            />
          ))}
      </div>
    </div>
  );
};

export default ExerciseSelect;

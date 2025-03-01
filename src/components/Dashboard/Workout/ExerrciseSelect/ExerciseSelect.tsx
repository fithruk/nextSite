import { Dispatch, MouseEvent } from "react";
import { ExerciceShortType } from "@/types/types";
import { muscleGroupImages } from "./images";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import btnStyles from "../../../CommonComponents/Button/button.module.css";
import exSelectStyles from "./exerciseSelect.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { ActionType, ExerciseActions } from "@/reducers/exercisesReducer";
import ExerciseShort from "../../ExerciseShort/ExerciseShort";

type ExerciseSelectTypes = {
  allExercises: ExerciceShortType[];
  filteredExercises: ExerciceShortType[];
  dispatch: Dispatch<ActionType>;
};

const ExerciseSelect = ({
  allExercises,
  filteredExercises,
  dispatch,
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
        {filteredExercises.map((ex) => (
          <ExerciseShort key={ex.id} exercise={ex} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseSelect;

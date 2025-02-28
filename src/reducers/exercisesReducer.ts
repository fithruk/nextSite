import { ExerciceShortType } from "@/types/types";

export enum ExerciseActions {
  setAllExercises = "SET_ALL_EXERCISES",
}

interface IState {
  allExercises: ExerciceShortType[];
  filteredExercises: ExerciceShortType[];
}

type ActionType = {
  type: ExerciseActions.setAllExercises;
  payload: ExerciceShortType[];
};

const exercisesReducer = (state: IState, action: ActionType) => {
  switch (action.type) {
    case ExerciseActions.setAllExercises:
      return {
        ...state,
        allExercises: [...action.payload],
        filteredExercises: [...action.payload],
      };

    default:
      return state;
  }
};

export { exercisesReducer };

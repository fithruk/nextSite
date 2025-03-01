import { ExerciceShortType } from "@/types/types";

export enum ExerciseActions {
  setAllExercises = "SET_ALL_EXERCISES",
  addFilter = "ADD_FILTER",
}

interface IState {
  allExercises: ExerciceShortType[];
  filteredExercises: ExerciceShortType[];
}

export type ActionType =
  | {
      type: ExerciseActions.setAllExercises;
      payload: ExerciceShortType[];
    }
  | {
      type: ExerciseActions.addFilter;
      payload: string;
    };

const exercisesReducer = (state: IState, action: ActionType) => {
  switch (action.type) {
    case ExerciseActions.setAllExercises:
      return {
        ...state,
        allExercises: [...action.payload],
        filteredExercises: [],
      };

    case ExerciseActions.addFilter:
      return {
        ...state,
        filteredExercises: state.allExercises.filter(
          (ex) => ex.exerciseMuscleGroup === action.payload
        ),
      };

    default:
      return state;
  }
};

export { exercisesReducer };

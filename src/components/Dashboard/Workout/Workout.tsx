"use client";
import workoutStyles from "./workoutStyles.module.css";
import { useEffect, useState, MouseEvent, useReducer } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ExerciceShortType } from "@/types/types";
import { ExerciseActions } from "@/reducers/exercisesReducer";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useWorkout } from "@/hooks/useWorkout";
import ExerciseSelect from "./ExerrciseSelect/ExerciseSelect";
import { exercisesReducer } from "@/reducers/exercisesReducer";

const Workout = () => {
  const session = useSession();
  const workout = useWorkout();

  const [state, dispatch] = useReducer(exercisesReducer, {
    allExercises: [],
    filteredExercises: [],
  });

  const [isExSelectOpen, setIsExSelectOpen] = useState<boolean>(false);
  const token = session.data?.user.token;

  const onClickHandle = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.workoutIsStarted === "true") {
      setIsExSelectOpen((isOpen) => (isOpen = !isOpen));
      return;
    }
    workout.startNewWorkout();
  };
  useEffect(() => {
    (async () => {
      const { data, status } = await axios.get<ExerciceShortType[]>(
        "/api/exercisesService/getAllExercises",
        {
          params: {
            token,
          },
        }
      );
      if (status === 200) {
        dispatch({ type: ExerciseActions.setAllExercises, payload: data });
      }
    })();
  }, []);

  return (
    <div className={workoutStyles.wrapper}>
      {!workout.getWorkoutData().isStarted ? (
        <AppButton variant="secondary" type="button" onClick={onClickHandle}>
          Start a new workout
        </AppButton>
      ) : (
        <AppButton
          variant="primary"
          type="button"
          data-workout-is-started={"true"}
          onClick={onClickHandle}
        >
          Add a new exercises into your plan
        </AppButton>
      )}
      {isExSelectOpen ? (
        <ExerciseSelect
          allExercises={state.allExercises}
          filteredExercises={state.filteredExercises}
          dispatch={dispatch}
          workout={workout}
        />
      ) : (
        state.allExercises.map((ex) => <p key={ex.id}>{ex.exerciseName}</p>)
      )}
    </div>
  );
};

export default Workout;

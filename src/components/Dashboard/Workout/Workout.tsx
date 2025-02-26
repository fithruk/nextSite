"use client";
import workoutStyles from "./workoutStyles.module.css";
import { useEffect, useState, MouseEvent } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ExerciceShortType } from "@/types/types";

import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useWorkout } from "@/hooks/useWorkout";
import ExerciseSelect from "./ExerrciseSelect/ExerciseSelect";

const Workout = () => {
  const session = useSession();

  const workout = useWorkout();
  const [exercises, setExercises] = useState<ExerciceShortType[]>([]);
  const [isExSelectOpen, setIsExSelectOpen] = useState<boolean>(false);
  const token = session.data?.user.token;

  const onClickHandle = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.workoutIsStarted === "true") {
      setIsExSelectOpen((state) => (state = !state));
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
        setExercises(data);
      }
    })();
  }, []);

  return (
    <div className={workoutStyles.wrapper}>
      {!workout.getWorkoutData().isStarded ? (
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
        <ExerciseSelect exercises={exercises} />
      ) : (
        exercises.map((ex) => <p key={ex.id}>{ex.imageUrl}</p>)
      )}
    </div>
  );
};

export default Workout;

import {
  ExerciceShortType,
  IUseWorkout,
  UserExercisesSet,
  WorkoutStateType,
} from "@/types/types";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from "react";
import { LocalStorageKeys } from "@/localSrorageKeys/localStorageKeys";

const useWorkout = (): IUseWorkout => {
  const localStorage = useLocalStorage<WorkoutStateType>();

  const savedData = localStorage.getItem(LocalStorageKeys.workout);

  const [isStarted, setIsStarted] = useState<boolean>(
    savedData?.isStarted ?? false
  );
  const [userExercises, setUserExercises] = useState<ExerciceShortType[]>(
    savedData?.userExercises ?? []
  );
  const [userExercisesSets, setUserExercisesSets] = useState<
    UserExercisesSet[]
  >(savedData?.userExercisesSets ?? []);

  const addNewExercise = (exercise: ExerciceShortType) => {
    setUserExercises((prev) => [...prev, exercise]);
  };

  const removeExercise = (exercise: ExerciceShortType) => {
    setUserExercises((prev) =>
      prev.filter((ex) => ex.exerciseName !== exercise.exerciseName)
    );
  };

  const addNewSet = (userExercisesSet: UserExercisesSet) => {
    setUserExercisesSets((prev) => [...prev, userExercisesSet]);
  };

  const removeSet = (ind: number, exerciseName: string) => {
    const setsByExercise = userExercisesSets.filter(
      (e) => e.exerciseName === exerciseName
    );

    if (setsByExercise[ind]) {
      setUserExercisesSets((state) =>
        state.filter(
          (ex) =>
            ex.timeOfStart.toString() !==
            setsByExercise[ind].timeOfStart.toString()
        )
      );
    }
  };

  const startNewWorkout = () => {
    setIsStarted(true);
    localStorage.setItem(LocalStorageKeys.workout, getWorkoutData());
  };

  const getWorkoutData = (): WorkoutStateType => ({
    userExercises,
    userExercisesSets,
    isStarted,
  });

  useEffect(() => {
    if (isStarted || userExercises.length || userExercisesSets.length) {
      localStorage.setItem(LocalStorageKeys.workout, getWorkoutData());
    }
  }, [isStarted, userExercises, userExercisesSets]);

  return {
    addNewExercise,
    removeExercise,
    addNewSet,
    removeSet,
    startNewWorkout,
    getWorkoutData,
  };
};

export { useWorkout };

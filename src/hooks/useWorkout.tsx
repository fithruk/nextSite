import { ExerciceShortType } from "@/types/types";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from "react";
import { LocalStorageKeys } from "@/localSrorageKeys/localStorageKeys";

interface IUseWorkout {
  addNewExercise: (exercise: ExerciceShortType) => void;
  addNewSet: (userExercisesSet: UserExercisesSet) => void;
  startNewWorkout: () => void;
  getWorkoutData: () => {
    isStarded: boolean;
    userExercises: ExerciceShortType[];
    userExercisesSets: UserExercisesSet[];
  };
}

type UserExercisesSet = {
  exerciseName: string;
  weightOfload: number;
  numberOfReps: number;
  timeOfStart: Date;
};

const useWorkout = (): IUseWorkout => {
  const [isStarded, setIsStarted] = useState<boolean>(false);
  const [userExercises, setUserExercises] = useState<ExerciceShortType[]>([]);
  const [userExercisesSets, setUserExercisesSets] = useState<
    UserExercisesSet[]
  >([]);
  const localStorage = useLocalStorage();

  const addNewExercise = (exercise: ExerciceShortType) => {
    setUserExercises((state) => [...state, exercise]);
  };

  const addNewSet = (userExercisesSet: UserExercisesSet) => {
    setUserExercisesSets((state) => [...state, userExercisesSet]);
  };

  const startNewWorkout = () => {
    setIsStarted(true);
    localStorage.setItem(LocalStorageKeys.workout, {});
  };

  const getWorkoutData = () => {
    return { userExercises, userExercisesSets, isStarded };
  };

  useEffect(() => {
    const value = localStorage.getItem(LocalStorageKeys.workout);
    if (value !== null) {
      setIsStarted(true);
    }
  }, []);

  return { addNewExercise, addNewSet, startNewWorkout, getWorkoutData };
};

export { useWorkout };

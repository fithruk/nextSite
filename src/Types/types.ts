export type WorkoutTypes = {
  musclesGroup: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
};

export type OneSet = Partial<{
  numberOfSet: number;
  numberOfreps: number;
  weightValue: number;
}>;

export type SetsAndValuesResults = {
  [exerciseName: string]: OneSet[];
};

export type WplanRespTypes = {
  clientName: string;
  dateOfWorkout: Date;
  workoutPlan: WorkoutTypes[];
};

export type AbonDataTypes = {
  abonementDuration: number;
  dateOfCreation: Date;
};

export type ExerciseResult = {
  exerciseName: string;
  sets: OneSet[];
};

export type CombinedWorkoutData = {
  clientName: string;
  dateOfWorkout: string;
  workoutPlan: WorkoutTypes[];
  workoutResult?: SetsAndValuesResults | null;
};

export type PlannedValueTypes = {
  exName: string;
  tonnage: number;
};

export interface ExerciseStepDescription {
  PhaseKey: number;
  PhaseName: "prepearing" | "processing" | "technicalTips";
  Instructions: string[];
}

export interface ExerciseStep {
  StepNameEng: string;
  StepNameRu: string;
  StepNameUa: string;
  DescriptionsRu: ExerciseStepDescription[];
  DescriptionsUa: ExerciseStepDescription[];
}

export interface Exercise {
  ExerciseName: string;
  ExerciseMuscleGroup: string;
  Equipment: string;
  Difficulty: "easy" | "medium" | "hard";
  ImageUrl: string;
  Steps: ExerciseStep[];
}

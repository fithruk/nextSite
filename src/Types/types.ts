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
  name?: string;
  abonementDuration: number;
  dateOfCreation: Date;
  dateOfLastActivation: Date | null;
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

export type WeightChangeDynamicsDataTypes = {
  date: string;
  sets: OneSet[];
};

export type SocketMessageType = {
  name: string;
  msg: string;
  role: "user" | "admin";
};

export interface WorkoutResultType {
  dateOfWorkout: Date;
  clientName: string;
  workoutResult: Map<string, OneSet[]>;
}

export type ClientTypes = {
  name: string;
  email: string;
  id: string;
};

export type NotificationTypes = {
  createdAt: Date;
  isRead: boolean;
  title: string;
  message: string;
  _id: string;
};

export enum TemplateNotificationEnum {
  "progressStatisticsCurrentAbon" = "Статистика прогресу за поточним абонентом",
  "testNotification" = "Test notification template",
  "customNotification" = "Кастомне повідомлення",
}

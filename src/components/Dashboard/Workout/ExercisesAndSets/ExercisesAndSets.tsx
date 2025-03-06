import { ExerciceShortType, IUseWorkout } from "@/types/types";
import exercisesAndSetsStyles from "./exAndSets.module.css";
import { useState, MouseEvent, ChangeEvent } from "react";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { Input } from "@/components/CommonComponents/Input/Input";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import Table from "@/components/CommonComponents/Table/Table";

type ExerciseAccordeonType = {
  exerciseShort: ExerciceShortType;
};

type StateTypes = {
  weight: number;
  reps: number;
};

const ExerciseAccordeon = ({ exerciseShort }: ExerciseAccordeonType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [weightsAndReps, setWeightsAndReps] = useState<StateTypes>({
    weight: 0,
    reps: 0,
  });
  //e: MouseEvent<HTMLDivElement>
  const handleClick = () => {
    setIsOpen((open) => (open = !open));
  };

  const addNewSetHandler = (
    e: MouseEvent<HTMLButtonElement>,
    exercise: ExerciceShortType
  ) => {
    e.stopPropagation();
    console.log(exercise.exerciseName + " " + weightsAndReps);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = +e.currentTarget.value;

    if (name && value) {
      setWeightsAndReps((state) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  return (
    <div
      draggable={true}
      className={exercisesAndSetsStyles.cart}
      onClick={handleClick}
    >
      <div className={exercisesAndSetsStyles.main}>
        <img
          className={exercisesAndSetsStyles.titleImage}
          src={exerciseShort.imageUrl}
          alt={exerciseShort.exerciseName}
        />
        <div className={exercisesAndSetsStyles.textContent}>
          <Typography type="p">
            Exercise: {exerciseShort.exerciseName}
          </Typography>
          <Typography type="p">
            Muscle Group: {exerciseShort.exerciseMuscleGroup}
          </Typography>
          <Typography type="p">Equipment: {exerciseShort.equipment}</Typography>
        </div>
      </div>
      {isOpen && (
        <div className={exercisesAndSetsStyles.table}>
          <Table columsTitles={["jopa", "Slyapa"]} tableData={["as", "as"]}>
            {
              <div className={exercisesAndSetsStyles.sets}>
                <Input
                  name="weight"
                  type="number"
                  min={0}
                  placeholder="weight"
                  value={weightsAndReps.weight}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={handleChange}
                />
                <Input
                  name="reps"
                  type="number"
                  min={0}
                  placeholder="reps"
                  value={weightsAndReps.reps}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={handleChange}
                />
                <AppButton
                  type="button"
                  variant="secondary"
                  onClick={(e) => addNewSetHandler(e, exerciseShort)}
                >
                  Add
                </AppButton>
              </div>
            }
          </Table>
        </div>
      )}
    </div>
  );
};

type ExercisesAndSetsTypes = {
  workout: IUseWorkout;
};

const ExercisesAndSets = ({ workout }: ExercisesAndSetsTypes) => {
  const userExercises = workout.getWorkoutData().userExercises;
  console.log(workout.getWorkoutData().userExercisesSets);
  return (
    <div>
      {userExercises.map((ex) => (
        <ExerciseAccordeon key={ex.id} exerciseShort={ex} />
      ))}
    </div>
  );
};

export default ExercisesAndSets;

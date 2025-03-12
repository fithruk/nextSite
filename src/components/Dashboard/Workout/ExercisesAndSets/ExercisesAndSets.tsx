import axios from "axios";
import { useSession } from "next-auth/react";
import {
  ExerciceFullType,
  ExerciceShortType,
  IUseWorkout,
  UserExercisesSet,
} from "@/types/types";
import exercisesAndSetsStyles from "./exAndSets.module.css";
import tableStyles from "../../../CommonComponents/Table/table.module.css";
import { useState, MouseEvent, ChangeEvent } from "react";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { Input } from "@/components/CommonComponents/Input/Input";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import Table from "@/components/CommonComponents/Table/Table";
import FullExercise from "../../ExerciseFull/ExerciseFull";

type ExerciseAccordeonType = {
  exerciseShort: ExerciceShortType;
  workout: IUseWorkout;
  token: string;
  setFullExercise: (exerciceFull: ExerciceFullType) => void;
};

type StateTypes = {
  weight: number;
  reps: number;
};

const ExerciseAccordeon = ({
  exerciseShort,
  workout,
  token,
  setFullExercise,
}: ExerciseAccordeonType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [weightsAndReps, setWeightsAndReps] = useState<StateTypes>({
    weight: 0,
    reps: 0,
  });
  //e: MouseEvent<HTMLDivElement>
  const handleClick = () => {
    setIsOpen((open) => !open);
  };

  const addNewSetHandler = (
    e: MouseEvent<HTMLButtonElement>,
    exercise: ExerciceShortType
  ) => {
    e.stopPropagation();

    const userExercisesSet: UserExercisesSet = {
      exerciseName: exercise.exerciseName,
      weightOfload: weightsAndReps.weight,
      numberOfReps: weightsAndReps.reps,
      timeOfStart: new Date(),
    };

    workout.addNewSet(userExercisesSet);
  };

  const removeExerciseHandler = () => {
    workout.removeExercise(exerciseShort);
  };

  const removeSetHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const eventElement = e.currentTarget.closest("tr");

    if (!eventElement) return;

    const tableRows = Array.from(
      eventElement?.parentElement?.querySelectorAll("tr") || []
    );

    const index = tableRows.indexOf(eventElement);

    workout.removeSet(index, exerciseShort.exerciseName);
  };

  const loadFullExerciseHandler = async (
    e: MouseEvent<HTMLButtonElement>,
    exerciseName: string
  ) => {
    e.stopPropagation();
    try {
      const { data, status } = await axios.post<ExerciceFullType>(
        "/api/exercisesService/getFullExerciseByName",
        {
          exerciseName,
          token,
        }
      );
      // Here....
      if (status === 200) setFullExercise(data);
    } catch (error) {
      console.log(error);
    }
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
    <div className={exercisesAndSetsStyles.cart} onClick={handleClick}>
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
          <Table
            columsTitles={["weight", "reps", " "]}
            tableData={workout
              .getWorkoutData()
              .userExercisesSets.filter(
                (ex) => ex.exerciseName === exerciseShort.exerciseName
              )}
            renderAddNewSetControll={() => (
              <>
                <tr className={tableStyles.row}>
                  <th className={tableStyles.item}>
                    {exerciseShort.equipment !== "bodyweight" ? (
                      <Input
                        name="weight"
                        type="number"
                        placeholder="weight"
                        min={0}
                        value={weightsAndReps.weight}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={handleChange}
                      />
                    ) : (
                      <Input
                        name="weight"
                        type="text"
                        placeholder="bodyweight"
                        disabled
                      />
                    )}
                  </th>
                  <th className={tableStyles.item}>
                    <Input
                      name="reps"
                      type="number"
                      placeholder="reps"
                      min={0}
                      value={weightsAndReps.reps}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={handleChange}
                    />
                  </th>
                  <th className={tableStyles.item} colSpan={2}>
                    <AppButton
                      type="button"
                      variant="secondary"
                      onClick={(e) => addNewSetHandler(e, exerciseShort)}
                    >
                      Add
                    </AppButton>
                  </th>
                </tr>
              </>
            )}
            renderRemoveControllButton={() => (
              <th className={tableStyles.item}>
                <AppButton
                  type="button"
                  variant="primary"
                  onClick={removeSetHandler}
                >
                  Remove Set
                </AppButton>
              </th>
            )}
          />
        </div>
      )}
      <div className={exercisesAndSetsStyles.buttons}>
        <AppButton
          variant="primary"
          type="button"
          onClick={removeExerciseHandler}
        >
          Remove Exercise
        </AppButton>
        <AppButton
          variant="secondary"
          type="button"
          onClick={(e) => {
            loadFullExerciseHandler(e, exerciseShort.exerciseName);
          }}
        >
          Info
        </AppButton>
      </div>
    </div>
  );
};

type ExercisesAndSetsTypes = {
  workout: IUseWorkout;
};

const ExercisesAndSets = ({ workout }: ExercisesAndSetsTypes) => {
  const userExercises = workout.getWorkoutData().userExercises;
  const session = useSession();
  const token = session.data?.user.token;
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [exercise, setExercise] = useState<ExerciceFullType | null>(null);

  const setFullExercise = (exerciceFull: ExerciceFullType) => {
    setIsInfoOpen((open) => !open);
    setExercise(exerciceFull);
  };

  return (
    <div>
      {isInfoOpen ? (
        <FullExercise {...exercise!} />
      ) : (
        userExercises.map((ex) => (
          <ExerciseAccordeon
            key={ex.id}
            exerciseShort={ex}
            workout={workout}
            token={token!}
            setFullExercise={setFullExercise}
          />
        ))
      )}
    </div>
  );
};

export default ExercisesAndSets;

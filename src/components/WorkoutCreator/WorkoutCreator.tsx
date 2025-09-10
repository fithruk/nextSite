import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import DeleteIcon from "@mui/icons-material/Delete";
import { useState, MouseEvent, ChangeEvent, FormEvent, useEffect } from "react";
import dayjs from "dayjs";
import { AppButton } from "../UI/AppButton/AppButton";
import ApiService from "@/app/apiService/apiService";
import {
  Exercise,
  WeightChangeDynamicsDataTypes,
  WorkoutTypes,
} from "@/Types/types";
import Chart, { ChartNamesEnum } from "../Chart/Chart";

dayjs.extend(isSameOrAfter);

const initialState = {
  musclesGroup: "",
  exercise: "",
  sets: 0,
  reps: 0,
  weight: 0,
};

type WorkoutCreatorProps = {
  date: Date | undefined;
  replaceDate: Date | undefined;
  exercises: Exercise[];
  name: string;
  apiService: ApiService;
};

enum CreatorOptionsEnum {
  create = "create",
  update = "update",
  delete = "delete",
}

const creatorOptions = [
  CreatorOptionsEnum.create,
  CreatorOptionsEnum.update,
  CreatorOptionsEnum.delete,
];

const WorkoutCreator = ({
  date,
  replaceDate,
  exercises,
  name,
  apiService,
}: WorkoutCreatorProps) => {
  const [select, setSelect] = useState<WorkoutTypes>({ ...initialState });
  const [creatorOption, setCreatorOption] = useState<CreatorOptionsEnum>(
    CreatorOptionsEnum.create
  );
  const musclGroupes = [
    ...new Set(exercises.map((ex) => ex.ExerciseMuscleGroup)),
  ];

  const [workoutExercises, setWorkoutExercises] = useState<WorkoutTypes[]>([]);

  const [chartData, setChartData] = useState<
    WeightChangeDynamicsDataTypes[] | undefined
  >(undefined);

  const handleChange = (event: SelectChangeEvent) => {
    setSelect((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelect((state) => ({
      ...state,
      [e.target.name]: +e.target.value,
    }));
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.textContent);

    setWorkoutExercises((state) => {
      const exists = state.some((ex) => ex.exercise === select.exercise);

      if (exists) {
        return state.map((ex) =>
          ex.exercise === select.exercise
            ? {
                ...ex,
                reps: select.reps,
                sets: select.sets,
                weight: select.weight,
              }
            : ex
        );
      } else {
        return [...state, { ...select }];
      }
    });
    setSelect({
      musclesGroup: select.musclesGroup,
      exercise: "",
      sets: 0,
      reps: 0,
      weight: 0,
    });
  };

  const handleDelete = (ind: number) => {
    const newExercises = workoutExercises.filter((_, i) => i != ind);
    setWorkoutExercises(newExercises);
  };

  /////////////////
  const onExerciseUpdate = (ind: number, exerciseName: string) => {
    console.log(ind + " ind");
    const muscleGrope = exercises.find(
      (ex) => ex.ExerciseName === exerciseName
    )?.ExerciseMuscleGroup;

    console.log(muscleGrope);
    setSelect({
      musclesGroup: muscleGrope!,
      exercise: exerciseName,
      sets: 0,
      reps: 0,
      weight: 0,
    });
  };

  ///////////////

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      switch (creatorOption) {
        case CreatorOptionsEnum.delete:
          console.log(creatorOption);

          const { status: deleteStatus } = await apiService.delete(
            "workouts/deleteWorkoutPlan",
            {
              data: {
                dateOfWorkout: date,
                clientName: name,
              },
            }
          );
          if (deleteStatus === 200) {
            alert("Workout has been removed");
            setWorkoutExercises([]);
          }
          break;

        case CreatorOptionsEnum.update:
          const { status: updateStatus } = await apiService.post(
            "workouts/saveWorkoutPlan",
            {
              dateOfWorkout:
                creatorOption === CreatorOptionsEnum.update
                  ? replaceDate
                  : date,
              clientName: name,
              workoutPlan: workoutExercises,
            }
          );
          if (updateStatus === 200) {
            alert("Succes");
            setSelect({ ...initialState });
            setWorkoutExercises([]);
          }
          break;

        case CreatorOptionsEnum.create:
          console.log(date + " date");
          const { status: createStatus } = await apiService.post(
            "workouts/saveWorkoutPlan",
            {
              dateOfWorkout:
                creatorOption === CreatorOptionsEnum.create
                  ? date
                  : replaceDate,
              clientName: name,
              workoutPlan: workoutExercises,
            }
          );
          if (createStatus === 200) {
            alert("Succes");
            setSelect({ ...initialState });
            setWorkoutExercises([]);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const loadWeightChangeDynamicsData = async () => {
    try {
      const { data, status } = await apiService.get<
        WeightChangeDynamicsDataTypes[]
      >(
        `statistics/GetWeightChangeDynamicsDataByName/${encodeURIComponent(
          name
        )}/${encodeURIComponent(select.exercise)}`
      );
      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const alignChartData = (data: WeightChangeDynamicsDataTypes[]) => {
    const newData = data.length > 10 ? data.slice(-10) : [...data];
    const alignedData = newData.map((item) => {
      const averageWeight =
        item.sets.reduce((acc, item) => (acc += item.weightValue ?? 0), 0) /
        item.sets.length;
      const averageReps =
        item.sets.reduce((acc, item) => (acc += item.numberOfreps ?? 0), 0) /
        item.sets.length;
      return {
        numberOfReps: averageReps,
        valueOfWeight: averageWeight,
      };
    });

    return alignedData;
  };

  const onChangeCreatorOption = (op: CreatorOptionsEnum) => {
    setCreatorOption(op);
  };

  const loadWorkoutPlanByDate = async () => {
    const { data, status } = await apiService.get<WorkoutTypes[]>(
      `/admin/getCurrentWorkoutPlan/${encodeURIComponent(name)}/${date}`
    );
    return { data, status };
  };

  useEffect(() => {
    (async () => {
      try {
        const {
          data: loadWorkoutPlanByDateData,
          status: loadWorkoutPlanByDateStatus,
        } = await loadWorkoutPlanByDate();
        setWorkoutExercises(loadWorkoutPlanByDateData);

        if (!loadWorkoutPlanByDateData.length)
          setCreatorOption(CreatorOptionsEnum.create);

        switch (creatorOption) {
          case CreatorOptionsEnum.create:
            if (
              loadWorkoutPlanByDateStatus === 200 &&
              loadWorkoutPlanByDateData.length
            ) {
              setCreatorOption(CreatorOptionsEnum.update);
            } else {
              setCreatorOption(CreatorOptionsEnum.create);
            }

            break;
          case CreatorOptionsEnum.update:
            console.log(CreatorOptionsEnum.update);

            break;
          case CreatorOptionsEnum.delete:
            console.log(CreatorOptionsEnum.delete);

            break;

          default:
            setCreatorOption(CreatorOptionsEnum.create);
            break;
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    })();
  }, [date, name, creatorOption]);

  useEffect(() => {
    if (select.exercise && select.musclesGroup) {
      (async () => {
        const data = await loadWeightChangeDynamicsData();
        setChartData(data);
      })();
    }
  }, [select.musclesGroup, select.exercise, name]);

  return (
    <Paper
      sx={{
        marginTop: { xs: "5vh", md: "2rem" },
        padding: { xs: "1vh", md: "1rem" },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 12 }} marginTop={{ xs: "5vh", md: "2rem" }}>
            {" "}
            <ButtonGroup
              variant="contained"
              sx={{ marginBottom: { xs: "1vh", md: "1rem" } }}
            >
              {creatorOptions.map((op) => (
                <Button
                  key={op}
                  color={op === creatorOption ? "info" : "inherit"}
                  onClick={() =>
                    onChangeCreatorOption(op as CreatorOptionsEnum)
                  }
                >
                  {op}
                </Button>
              ))}
            </ButtonGroup>
            {dayjs(date).isSameOrAfter(dayjs(), "day") ? (
              <Typography variant="body1">
                Створити нове тренування для{" "}
                <Typography color="info" component={"span"}>
                  {name}
                </Typography>{" "}
                на{" "}
                {date ? (
                  <Typography component={"span"} color="info">
                    {dayjs(date).format("DD.MM.YYYY")}
                  </Typography>
                ) : (
                  " Select the date "
                )}
              </Typography>
            ) : (
              <Typography>
                План минулого тренування на{" "}
                {
                  <Typography component={"span"} color="info">
                    {dayjs(date).format("DD.MM.YYYY")}
                  </Typography>
                }{" "}
                . Оберіть дату для копіювання плану попереднього тренування на
                іншу дату:{" "}
                {replaceDate ? (
                  <Typography component={"span"} color="warning">
                    {dayjs(replaceDate).format("DD.MM.YYYY")}
                  </Typography>
                ) : (
                  <Typography component={"span"} color="warning">
                    Select the date
                  </Typography>
                )}
              </Typography>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="musclesGroup">Вибери групу м'язів:</InputLabel>
              <Select
                labelId="musclesGroup"
                id="musclesGroupSelect"
                value={select.musclesGroup}
                label="musclesGroup"
                name="musclesGroup"
                onChange={handleChange}
              >
                {musclGroupes.map((gr) => (
                  <MenuItem key={gr} value={gr}>
                    {gr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {select.musclesGroup && (
              <FormControl fullWidth>
                <InputLabel id="exercise">Вибери вправу:</InputLabel>
                <Select
                  labelId="exercise"
                  id="exerciseSelect"
                  value={select.exercise}
                  label="exercise"
                  name="exercise"
                  onChange={handleChange}
                >
                  {exercises
                    .filter(
                      (ex) => ex.ExerciseMuscleGroup === select.musclesGroup
                    )
                    .sort((a, b) =>
                      a.ExerciseName.localeCompare(b.ExerciseName)
                    )
                    .map((ex) => (
                      <MenuItem key={ex.ExerciseName} value={ex.ExerciseName}>
                        {ex.ExerciseName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid container size={{ xs: 12, md: 12 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              {" "}
              <TextField
                onChange={onInputHandler}
                fullWidth
                id="setsField"
                label="Sets"
                value={select.sets}
                name="sets"
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              {" "}
              <TextField
                onChange={onInputHandler}
                fullWidth
                id="repsField"
                label="Reps"
                type="number"
                value={select.reps}
                name="reps"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              {" "}
              <TextField
                onChange={onInputHandler}
                fullWidth
                id="weightField"
                label="Weight"
                value={select.weight}
                type="number"
                name="weight"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            {select.exercise && select.musclesGroup && (
              <Chart
                chartType={ChartNamesEnum.weightChangeDynamics}
                data={{ weightChangeDynamics: alignChartData(chartData ?? []) }}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <AppButton
              sx={{ width: "-webkit-fill-available" }}
              type="button"
              onClick={handleClick}
              disabled={Object.values(select).some((v) => !v)}
            >
              Додати вправу
            </AppButton>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            {" "}
            <List>
              {workoutExercises.map((ex, ind) => (
                <ListItem
                  key={`${ex.exercise} ${ind}`}
                  component={"li"}
                  onClick={() => {
                    onExerciseUpdate(ind, ex.exercise);
                  }}
                  secondaryAction={
                    <IconButton
                      onClick={() => handleDelete(ind)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${ind + 1}. ${ex.exercise}`}
                    secondary={`${ex.sets} * ${ex.reps} (${ex.weight}kg)`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          {workoutExercises.length !== 0 && (
            <Grid size={{ xs: 12, md: 4 }}>
              <AppButton sx={{ width: "-webkit-fill-available" }} type="submit">
                {creatorOption === CreatorOptionsEnum.create && (
                  <Typography component={"span"}>
                    Створити тернування на {dayjs(date).format("DD.MM.YYYY")}
                  </Typography>
                )}
                {creatorOption === CreatorOptionsEnum.update && (
                  <Typography component={"span"}>
                    Створити тернування на{" "}
                    {dayjs(replaceDate).format("DD.MM.YYYY")}
                  </Typography>
                )}
                {creatorOption === CreatorOptionsEnum.delete && (
                  <Typography component={"span"}>
                    Видалити тернування на {dayjs(date).format("DD.MM.YYYY")}
                  </Typography>
                )}
              </AppButton>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default WorkoutCreator;

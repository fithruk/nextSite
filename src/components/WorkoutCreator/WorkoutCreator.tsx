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

const WorkoutCreator = ({
  date,
  replaceDate,
  exercises,
  name,
  apiService,
}: WorkoutCreatorProps) => {
  const [select, setSelect] = useState<WorkoutTypes>({ ...initialState });
  const [creatorOptions, setCreatorOptions] = useState<
    Record<CreatorOptionsEnum, boolean>
  >({
    [CreatorOptionsEnum.create]: true,
    [CreatorOptionsEnum.update]: false,
    [CreatorOptionsEnum.delete]: false,
  });
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

    setWorkoutExercises((state) => [...state, { ...select }]);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status } = await apiService.post("workouts/saveWorkoutPlan", {
        dateOfWorkout: date,
        clientName: name,
        workoutPlan: workoutExercises,
      });
      if (status === 200) {
        alert("Succes");
        setSelect({ ...initialState });
        setWorkoutExercises([]);
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
    setCreatorOptions(() =>
      Object.values(CreatorOptionsEnum).reduce((acc, key) => {
        acc[key] = key === op;
        return acc;
      }, {} as Record<CreatorOptionsEnum, boolean>)
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await apiService.get<WorkoutTypes[]>(
          `/admin/getCurrentWorkoutPlan/${encodeURIComponent(name)}/${date}`
        );
        if (status === 200) {
          setWorkoutExercises(data);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    })();
  }, [date, name]);

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
              {Object.keys(creatorOptions).map((op) => (
                <Button
                  key={op}
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
                <Typography component={"span"} color="info">
                  {dayjs(date).format("DD.MM.YYYY")}
                </Typography>{" "}
                або {dayjs(replaceDate).format("DD.MM.YYYY")}
              </Typography>
            ) : (
              `План минулого тренування на ${dayjs(date).format("DD.MM.YYYY")}`
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
                Save
              </AppButton>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default WorkoutCreator;

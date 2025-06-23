import {
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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useState, MouseEvent, ChangeEvent, FormEvent } from "react";
import dayjs from "dayjs";
import { Exercise } from "@/app/dashboard/admin/clients/page";
import { AppButton } from "../UI/AppButton/AppButton";
import ApiService from "@/app/apiService/apiService";

const initialState = {
  musclesGroup: "",
  exercise: "",
  sets: 0,
  reps: 0,
  weight: 0,
};

type WorkoutCreatorProps = {
  date: Date | undefined;
  exercises: Exercise[];
  name: string;
  apiService: ApiService;
};

export type WorkoutTypes = {
  musclesGroup: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
};

const WorkoutCreator = ({
  date,
  exercises,
  name,
  apiService,
}: WorkoutCreatorProps) => {
  const [select, setSelect] = useState<WorkoutTypes>({ ...initialState });
  const musclGroupes = [
    ...new Set(exercises.map((ex) => ex.ExerciseMuscleGroup)),
  ];

  const [workoutExercises, setWorkoutExercises] = useState<WorkoutTypes[]>([]);

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
            Нове тренування для {name} {dayjs(date).format("DD.MM.YYYY.HH:mm")}
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

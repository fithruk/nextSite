import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AppInput } from "../UI/AppInput/AppInput";
import { useState } from "react";
import dayjs from "dayjs";
import { Exercise } from "@/app/dashboard/admin/clients/page";

type WorkoutCreatorProps = {
  date: Date | undefined;
  exercises: Exercise[];
  name: string;
};

const WorkoutCreator = ({ date, exercises, name }: WorkoutCreatorProps) => {
  const [select, setSelect] = useState({ musclesGroup: "", exercise: "" });
  const musclGroupes = [
    ...new Set(exercises.map((ex) => ex.ExerciseMuscleGroup)),
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setSelect((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <Paper sx={{ marginTop: { xs: "5vh", md: "2rem" } }}>
      <form>
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
                  id="exerciseSelect2"
                  value={select.exercise}
                  label="exercise"
                  name="exercise"
                  onChange={handleChange}
                >
                  {exercises
                    .filter(
                      (ex) => ex.ExerciseMuscleGroup === select.musclesGroup
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
                fullWidth
                id="setsField"
                label="Sets"
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
                fullWidth
                id="repsField"
                label="Reps"
                type="number"
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
                fullWidth
                id="weightField"
                label="Weight"
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
        </Grid>
      </form>
    </Paper>
  );
};

export default WorkoutCreator;

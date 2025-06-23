import { Divider, Grid, TextField } from "@mui/material";
import { WorkoutTypes } from "../WorkoutCreator/WorkoutCreator";
import { MouseEvent } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { AppButton } from "../UI/AppButton/AppButton";
import { OneSet, SetsAndValuesResults } from "@/app/dashboard/workouts/page";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ApiService from "@/app/apiService/apiService";

type ExerciseItemTypes = {
  item: WorkoutTypes;
  setsAndValuesResults: SetsAndValuesResults;
  addNewSetHandler: (exerciseName: string, newSet: OneSet) => void;
};

const ExerciseItem = ({
  item,
  setsAndValuesResults,
  addNewSetHandler,
}: ExerciseItemTypes) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.exercise });

  const [isOpen, setIsOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "1rem",
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement;
    const openButton = button.dataset.openButton;

    if (openButton === "true") {
      setIsOpen((open) => !open);
      return;
    }

    const innerText = e.currentTarget.textContent?.toLowerCase();
    const parent = e.currentTarget.parentElement;
    const numberOfSet = Number(
      parent?.parentElement?.querySelector("p")?.textContent?.split(" ")[1]
    );

    if (!parent || isNaN(numberOfSet)) return;

    const inputs = parent.querySelectorAll("input");

    let numberOfreps: number | undefined;
    let weightValue: number | undefined;

    inputs.forEach((input) => {
      const repsNumber = input.dataset.reps;
      const weightNumber = input.dataset.weights;
      let value = input.value;

      if (innerText?.includes("reset")) {
        if (input.name === "reps") input.value = "";
        if (input.name === "weight") input.value = "";
        return;
      }

      if (!value || value === "0") {
        if (input.name === "reps") {
          input.value = String(item.reps);
          value = String(item.reps);
        }
        if (input.name === "weight") {
          input.value = String(item.weight);
          value = String(item.weight);
        }
      }

      if (repsNumber) numberOfreps = +value;
      if (weightNumber) weightValue = +value;
    });

    if (numberOfreps && weightValue) {
      addNewSetHandler(item.exercise, {
        numberOfSet,
        numberOfreps,
        weightValue,
      });
    }
  };

  return (
    <Paper ref={setNodeRef} sx={style}>
      <Box
        sx={{
          p: 2,
          cursor: "pointer",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography fontWeight="bold">{item.exercise}</Typography>
            <Typography>М'язи: {item.musclesGroup}</Typography>
            <Typography>
              Підходи: {item.sets}, Повтори: {item.reps}, Вага: {item.weight} кг
            </Typography>
          </Box>

          <Box {...attributes} {...listeners} sx={{ cursor: "grab", ml: 2 }}>
            <DragIndicatorIcon />
          </Box>
          <AppButton
            sx={{ cursor: "pointer", ml: 2, marginTop: "0" }}
            onClick={handleClick}
            data-open-button="true"
          >
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </AppButton>
        </Box>
        {isOpen && (
          <Box mt={2}>
            {Array.from({ length: item.sets }).map((_, i) => (
              <Grid container key={i} display="flex" gap={2} mb={1}>
                <Grid size={{ xs: 12, md: 6 }} component={"form"}>
                  {" "}
                  <Typography>Підход {i + 1}</Typography>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <TextField
                      inputProps={{ "data-reps": `reps_${i + 1}`, min: 0 }}
                      name="reps"
                      type="number"
                      placeholder="Повторы"
                      fullWidth
                      defaultValue={
                        setsAndValuesResults[item.exercise]?.[i]
                          ?.numberOfreps ?? 0
                      }
                    />
                    <TextField
                      inputProps={{
                        "data-weights": `weights_${i + 1}`,
                        min: 0,
                      }}
                      name="weight"
                      type="number"
                      placeholder="Вага (кг)"
                      fullWidth
                      defaultValue={
                        setsAndValuesResults[item.exercise]?.[i]?.weightValue ??
                        0
                      }
                    />
                    <AppButton
                      onClick={handleClick}
                      sx={{
                        margin: "0 1rem",
                        backgroundColor: "var(--yellow)",
                        borderRadius: "50%",
                      }}
                    >
                      Add ✔
                    </AppButton>
                    <AppButton
                      onClick={handleClick}
                      sx={{
                        margin: "0 1rem",
                        backgroundColor: "var(--yellow)",
                        borderRadius: "50%",
                      }}
                    >
                      Reset
                    </AppButton>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

const ExerciseSession = ({
  exercises,
  setsAndValuesResults,
  apiService,
  eventDate,
  name,
  addNewSetHandler,
}: {
  exercises: WorkoutTypes[];
  setsAndValuesResults: SetsAndValuesResults;
  apiService: ApiService;
  eventDate?: Date;
  name: string;
  addNewSetHandler: (exerciseName: string, newSet: OneSet) => void;
}) => {
  const [items, setItems] = useState<WorkoutTypes[]>(exercises);
  const { removeItem } = useLocalStorage();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.exercise === active.id);
      const newIndex = items.findIndex((item) => item.exercise === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const onSaveWorkout = async () => {
    console.log(setsAndValuesResults);
    const { status } = await apiService.post("/workouts/saveWorkoutResults", {
      name,
      date: eventDate,
      workoutResult: setsAndValuesResults,
    });
    if (status === 200) {
      removeItem("workout");
    }
    console.log(status + " status /workouts/saveWorkoutResults");
  };

  useEffect(() => {
    setItems(exercises);
  }, [exercises]);

  return (
    <>
      {" "}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.exercise)}
          strategy={verticalListSortingStrategy}
        >
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid size={{ xs: 12, md: 12 }} key={item.exercise}>
                <ExerciseItem
                  item={item}
                  setsAndValuesResults={setsAndValuesResults}
                  addNewSetHandler={addNewSetHandler}
                />
              </Grid>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
      <Divider sx={{ margin: "2rem 0" }} />
      {items.length && (
        <AppButton onClick={onSaveWorkout} sx={{ marginTop: "0" }}>
          Завершити тренування
        </AppButton>
      )}
    </>
  );
};

export default ExerciseSession;

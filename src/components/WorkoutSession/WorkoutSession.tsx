import { CircularProgress, Divider, Grid, TextField } from "@mui/material";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { AppButton } from "../UI/AppButton/AppButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ApiService from "@/app/apiService/apiService";
import {
  Exercise,
  OneSet,
  SetsAndValuesResults,
  WeightChangeDynamicsDataTypes,
  WorkoutTypes,
} from "@/Types/types";
import ExerciseDetails from "../ExerciseDetails/ExerciseDetails";
import dayjs from "dayjs";
import Chart, { ChartNamesEnum } from "../Chart/Chart";

type ExerciseItemTypes = {
  item: WorkoutTypes;
  exLibrary: Exercise[];
  setsAndValuesResults: SetsAndValuesResults;
  addNewSetHandler: (exerciseName: string, newSet: OneSet) => void;
  name: string;
  apiService: ApiService;
  eventDate?: Date;
};

const ExerciseItem = ({
  item,
  exLibrary,
  setsAndValuesResults,
  addNewSetHandler,
  name,
  apiService,
  eventDate,
}: ExerciseItemTypes) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.exercise });

  const [isOpen, setIsOpen] = useState(false);
  const [chartData, setChartData] = useState<
    WeightChangeDynamicsDataTypes[] | undefined
  >(undefined);

  const targetExercise = exLibrary.find(
    (ex) => ex.ExerciseName == item.exercise
  );

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
        addNewSetHandler(item.exercise, {
          numberOfSet,
          numberOfreps: 0,
          weightValue: 0,
        });
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

  const loadWeightChangeDynamicsData = async () => {
    try {
      const { data, status } = await apiService.get<
        WeightChangeDynamicsDataTypes[]
      >(
        `statistics/GetWeightChangeDynamicsDataByName/${encodeURIComponent(
          name
        )}/${encodeURIComponent(item.exercise)}`
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

  useEffect(() => {
    if (isOpen) {
      (async () => {
        const data = await loadWeightChangeDynamicsData();
        setChartData(data);
      })();
    }
  }, [isOpen]);

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
          {eventDate && dayjs(eventDate).isSame(dayjs(), "day") && (
            <AppButton
              sx={{ cursor: "pointer", ml: 2, marginTop: "0" }}
              onClick={handleClick}
              data-open-button="true"
            >
              {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </AppButton>
          )}
        </Box>
        {isOpen && (
          <Box mt={2}>
            <Grid container display={"flex"} alignItems={"center"}>
              <Grid size={{ xs: 12, md: 12 }}>
                <ExerciseDetails exercise={targetExercise!} locale="ua" />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <Chart
                  chartType={ChartNamesEnum.weightChangeDynamics}
                  data={{
                    weightChangeDynamics: alignChartData(chartData ?? []),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                {Array.from({ length: item.sets }).map((_, i) => (
                  <Grid container key={i} display="flex" gap={2} mb={1}>
                    <Grid size={{ xs: 12, md: 12 }} component={"form"}>
                      {" "}
                      <Typography>Підход {i + 1}</Typography>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        sx={{
                          "@media(max-width: 600px)": {
                            flexWrap: "wrap",
                          },
                        }}
                      >
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
                          sx={{
                            "@media(max-width: 600px)": {
                              margin: "1vh 0",
                            },
                          }}
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
                            setsAndValuesResults[item.exercise]?.[i]
                              ?.weightValue ?? 0
                          }
                          sx={{
                            "@media(max-width: 600px)": {
                              margin: "1vh 0",
                            },
                          }}
                        />
                        <AppButton
                          onClick={handleClick}
                          sx={{
                            margin: "0 1rem",
                            backgroundColor: "var(--yellow)",
                            borderRadius: "50%",
                            "@media(max-width: 600px)": {
                              margin: "1vh 0",
                              width: "-webkit-fill-available",
                            },
                          }}
                        >
                          Add
                        </AppButton>
                        <AppButton
                          onClick={handleClick}
                          sx={{
                            margin: "0 1rem",
                            backgroundColor: "var(--yellow)",
                            borderRadius: "50%",
                            "@media(max-width: 600px)": {
                              margin: 0,
                              width: "-webkit-fill-available",
                            },
                          }}
                        >
                          Reset
                        </AppButton>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

const ExerciseSession = ({
  exercises,
  exLibrary,
  setsAndValuesResults,
  apiService,
  eventDate,
  name,
  addNewSetHandler,
}: {
  exercises: WorkoutTypes[];
  exLibrary: Exercise[];
  setsAndValuesResults: SetsAndValuesResults;
  apiService: ApiService;
  eventDate?: Date;
  name: string;
  addNewSetHandler: (exerciseName: string, newSet: OneSet) => void;
}) => {
  const [items, setItems] = useState<WorkoutTypes[]>(exercises);
  const [isSavingWorkout, setIsSavingWorkout] = useState<boolean>(false);
  const router = useRouter();
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
    setIsSavingWorkout(true);

    try {
      const { status } = await apiService.post("/workouts/saveWorkoutResults", {
        name,
        date: eventDate,
        workoutResult: setsAndValuesResults,
      });

      if (status === 200) {
        removeItem("workout");
        alert("Тренування збережено");
      }

      console.log(status + " status /workouts/saveWorkoutResults");
    } catch (error) {
      alert((error as Error).message);
      router.push("/login");
    } finally {
      setIsSavingWorkout(false);
    }
  };

  useEffect(() => {
    setItems(exercises);
  }, [exercises]);

  return (
    <>
      {" "}
      {items.length > 0 ? (
        <Typography color="info" variant="h4">
          План тренування на {dayjs(eventDate).format("DD.MM.YYYY")}
        </Typography>
      ) : (
        ""
      )}
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
                  exLibrary={exLibrary}
                  setsAndValuesResults={setsAndValuesResults}
                  addNewSetHandler={addNewSetHandler}
                  name={name}
                  apiService={apiService}
                  eventDate={eventDate}
                />
              </Grid>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
      <Divider sx={{ margin: "2rem 0" }} />
      {items.length > 0 && dayjs(eventDate).isSame(dayjs(), "day") ? (
        <AppButton
          onClick={onSaveWorkout}
          sx={{
            marginTop: "0",
          }}
          disabled={isSavingWorkout}
        >
          {isSavingWorkout ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={40} color="primary" />
            </Box>
          ) : (
            "Завершити тренування"
          )}
        </AppButton>
      ) : (
        <Typography color="info" variant="h4" textAlign={"center"}>
          {dayjs(eventDate).isSame(dayjs(), "day")
            ? "Вибери тренування у календарі"
            : "На сьогоднi тренувань нема"}
        </Typography>
      )}
    </>
  );
};

export default ExerciseSession;

"use client";

import {
  Grid,
  SnackbarContent,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

import ApiService from "@/app/apiService/apiService";
import CalendarComponent from "@/components/Calendar/Calendar";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import moment from "moment";
import WorkoutSession from "@/components/WorkoutSession/WorkoutSession";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import PassedWorkout from "@/components/PassedWorkout/PassedWorkout";
import {
  AbonDataTypes,
  Exercise,
  OneSet,
  SetsAndValuesResults,
  WorkoutTypes,
  WplanRespTypes,
} from "@/Types/types";

type WorkoutEvent = {
  title: string;
  start: Date;
  end: Date;
};

type WKStatTypes = {
  wkAmount: number;
};

const Workouts = () => {
  const session = useSession();
  const name = session.data?.user.name;
  const token = session.data?.user.accessToken;
  const storage = useLocalStorage<SetsAndValuesResults>();

  const apiService = new ApiService(process.env.NEXT_PUBLIC_SERVER_URL!, token);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  const [wkStat, setWkStat] = useState<WKStatTypes | null>();
  const [abonData, setAbonData] = useState<AbonDataTypes | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<WorkoutEvent | null>(null);

  const [wPlan, setWplan] = useState<WorkoutTypes[]>([]);
  const [exLibrary, setExLibrary] = useState<Exercise[]>([]);

  const [setsAndValuesResults, setSetsAndValuesResults] =
    useState<SetsAndValuesResults>({});

  const addNewSetHandler = (exerciseName: string, newSet: OneSet) => {
    setSetsAndValuesResults((prev) => {
      const prevSets = prev[exerciseName] || [];

      const filtered = prevSets.filter(
        (set) => set.numberOfSet !== newSet.numberOfSet
      );

      return {
        ...prev,
        [exerciseName]: [...filtered, newSet],
      };
    });
  };

  const onSelectEventHandler = async (event: WorkoutEvent) => {
    console.log("Клик по событию:", event);
    setSelectedEvent(event);
    try {
      const { data, status } = await apiService.post<{
        workoutPlan: WplanRespTypes;
      }>("/workouts/getWorkoutPlan", {
        dateOfWorkout: event.start,
        clientName: name,
      });

      if (status === 200) {
        setWplan(data.workoutPlan.workoutPlan);

        const { data: dataLib, status: statusLib } = await apiService.post<
          Exercise[]
        >("/exercises/loadExercisesByPlan", {
          exercises: data.workoutPlan.workoutPlan.map((ex) =>
            ex.exercise.toString()
          ),
        });
        if (statusLib === 200) {
          setExLibrary(dataLib);
        }

        const exercisesKeys = Object.entries(data.workoutPlan.workoutPlan).map(
          (el) => [(el[0] = el[1].exercise), el[1].sets]
        );

        const preState = Object.fromEntries(exercisesKeys);

        for (const key in preState) {
          preState[key] = Array.from({ length: preState[key] }).map((_, i) => ({
            numberOfSet: i + 1,
            numberOfreps: 0,
            weightValue: 0,
          }));
        }
        const workoutData = storage.getItem("workout") || {};
        if (workoutData) {
          setSetsAndValuesResults(workoutData);
          return;
        }
        setSetsAndValuesResults(preState);
      }
    } catch (error) {
      alert((error as Error).message + " Плану тренування немає");
      setWplan([]);
    }
  };

  useEffect(() => {
    if (!name) return;

    (async () => {
      try {
        const [workoutRes, abonementRes] = await Promise.all([
          apiService.get<{ workoutDates: Date[] }>(
            `/dataBase/getWKDatesByName/${encodeURIComponent(name)}`
          ),
          apiService.get<{
            abonement: AbonDataTypes;
          }>(`/dataBase/getAbonByName/${encodeURIComponent(name)}`),
        ]);

        if (workoutRes.status === 200) {
          let allWorkouts = 0;
          const workoutsEvents: WorkoutEvent[] =
            workoutRes.data.workoutDates.map((date) => {
              allWorkouts += 1;
              return {
                title: "Тренування",
                start: new Date(date),
                end: moment(date).add(1, "hour").toDate(),
              };
            });

          setEvents(workoutsEvents);
          setWkStat({ wkAmount: allWorkouts });
        }

        if (abonementRes.status === 200) {
          setAbonData({
            abonementDuration: abonementRes.data.abonement.abonementDuration,
            dateOfCreation: abonementRes.data.abonement.dateOfCreation,
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (err instanceof Error)
          alert(err.message + " Плану тренування немає");
      }
    })();
  }, [name]);

  useEffect(() => {
    if (Object.values(setsAndValuesResults).length) {
      storage.setItem("workout", setsAndValuesResults);
    }
  }, [setsAndValuesResults]);

  const isPastWorkout = selectedEvent?.start
    ? dayjs().startOf("day").isAfter(dayjs(selectedEvent.start).startOf("day"))
    : false;

  const isRenderTable = wPlan.length > 0;

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2, md: 4 }}
      sx={{
        minHeight: "100vh",
        "@media(max-width:600px)": {
          minHeight: "max-content",
        },
      }}
    >
      <Grid size={{ xs: 12, md: 8 }}>
        {" "}
        <AppBox>
          <CalendarComponent
            events={events}
            selectedEvent={selectedEvent}
            onSelectEvent={onSelectEventHandler}
          />
          <Divider sx={{ margin: "2rem 0" }} />
          {isPastWorkout && isRenderTable ? (
            <PassedWorkout
              apiService={apiService}
              eventDate={selectedEvent?.start ?? new Date()}
              name={name ?? ""}
            />
          ) : (
            <WorkoutSession
              exercises={wPlan}
              exLibrary={exLibrary}
              setsAndValuesResults={setsAndValuesResults}
              apiService={apiService}
              eventDate={selectedEvent?.start}
              name={name ?? ""}
              addNewSetHandler={addNewSetHandler}
            />
          )}
        </AppBox>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <AppBox>
          <Stack spacing={2}>
            <SnackbarContent
              component={"h1"}
              message="Загальна інформація:"
              sx={{
                marginTop: "1rem",
                borderRadius: "1rem",
                backgroundColor: "var(--blue)",

                "@media(max-width: 600px)": {
                  ".MuiSnackbarContent-message": { fontSize: "4vw" },
                },
              }}
            />
            <SnackbarContent
              sx={{
                borderRadius: "1rem",
                backgroundColor: "var(--blue)",

                "@media(max-width: 600px)": {
                  ".MuiSnackbarContent-message": {
                    display: "block",
                    width: "100%",
                  },

                  ".MuiSnackbarContent-message .MuiTypography-root": {
                    fontSize: "4vw",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  },
                },
              }}
              message={
                <Typography component={"h4"}>
                  Дата початку поточного абонементу:{" "}
                  {dayjs(abonData?.dateOfCreation)
                    .toDate()
                    .toLocaleDateString()}
                </Typography>
              }
            />
            <SnackbarContent
              sx={{
                borderRadius: "1rem",
                backgroundColor: "var(--blue)",

                "@media(max-width: 600px)": {
                  ".MuiSnackbarContent-message .MuiTypography-root": {
                    fontSize: "4vw",
                  },
                },
              }}
              message={
                <Typography component={"h4"}>
                  Кількість тренувань, які залишилися:{" "}
                  {abonData?.abonementDuration}
                </Typography>
              }
            />
            {events[0] && (
              <SnackbarContent
                sx={{
                  borderRadius: "1rem",
                  backgroundColor: "var(--blue)",

                  "@media(max-width: 600px)": {
                    ".MuiSnackbarContent-message .MuiTypography-root": {
                      fontSize: "4vw",
                    },
                  },
                }}
                message={
                  <Typography component={"h4"}>
                    Тренувань всього, починаючи з{" "}
                    {dayjs(events[0].start).format("DD.MM.YYYY").toString()}(
                    {wkStat?.wkAmount})
                  </Typography>
                }
              />
            )}
          </Stack>
        </AppBox>
      </Grid>
    </Grid>
  );
};

export default Workouts;

"use client";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import moment from "moment";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SnackbarContent,
  Stack,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect, FormEvent } from "react";
import ApiService from "@/app/apiService/apiService";
import { useSession } from "next-auth/react";
import CalendarComponent, {
  WorkoutEvent,
} from "@/components/Calendar/Calendar";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/uk";
import { AppButton } from "@/components/UI/AppButton/AppButton";
import WorkoutCreator from "@/components/WorkoutCreator/WorkoutCreator";
import { SlotInfo } from "react-big-calendar";
import {
  AbonDataTypes,
  CombinedWorkoutData,
  Exercise,
  ClientTypes,
} from "@/Types/types";
import DisplayingPassedWorkouts from "@/components/DisplayingPassedWorkouts/DisplayingPassedWorkouts";
import TableOfClients from "@/components/TableOfClients/TableOfClients";

dayjs.locale("uk");

const Clients = () => {
  const session = useSession();
  const token = session.data?.user.accessToken;

  const apiService = new ApiService(process.env.NEXT_PUBLIC_SERVER_URL!, token);

  const [clients, setClients] = useState<ClientTypes[]>([]);

  const [selectValue, setSelectValue] = useState("");
  const [abonDuration, setAbonDuration] = useState("");
  const [message, setMessage] = useState("");
  const [clientWorkouts, setClientWorkous] = useState<WorkoutEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<WorkoutEvent | null>(null);
  const [allExrecises, setAllExercises] = useState<Exercise[]>([]);
  const [combinedWorkouts, setCombinedWorkouts] = useState<
    CombinedWorkoutData[]
  >([]);
  const [currentAbonement, setCurrentAbonement] =
    useState<AbonDataTypes | null>(null);
  const [abonDurationDates, setAbonDurationDates] = useState<{
    start: Dayjs;
  }>({
    start: dayjs(),
  });

  const onSelectEventHandler = (event: WorkoutEvent) => {
    console.log("Клик по событию:", event);
    setSelectedEvent(event);
  };

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const { data, status } = await apiService.get<{ users: ClientTypes[] }>(
          "/admin/getAllClients"
        );
        if (status === 200) {
          setClients(
            data.users
              .filter((client) => client.name !== "белов сергей")
              .sort((a, b) => a.name.localeCompare(b.name))
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

  const handleChangeClient = async (event: SelectChangeEvent) => {
    const value = event.target.value;

    if (!value) return;
    if (typeof value === "string") {
      setSelectValue(value);

      const [clientsWorkouts, abonement, exercises] = await Promise.all([
        await apiService.post<{
          clientsWorkouts: Date[];
        }>("/admin/getClientWorkouts", { name: value }),
        apiService.get<{
          abonement: AbonDataTypes;
        }>(`/dataBase/getAbonByName/${encodeURIComponent(value)}`),
        apiService.get<{
          exercises: Exercise[];
        }>(`/exercises/allExercises`),
      ]);

      if (clientsWorkouts.status === 200) {
        const workouts = clientsWorkouts.data.clientsWorkouts
          .filter((date) => moment(date).isValid())
          .map((date) => ({
            title: "Тренування",
            start: moment(date).toDate(),
            end: moment(date).add(1, "hour").toDate(),
          }));

        setClientWorkous(workouts);
      }
      if (abonement.status === 200) {
        setCurrentAbonement({
          abonementDuration: abonement.data.abonement.abonementDuration,
          dateOfCreation: abonement.data.abonement.dateOfCreation,
          dateOfLastActivation: null,
        });
      }
      if (exercises.status === 200) {
        setAllExercises(exercises.data.exercises);
      }
    }
  };

  const handleChangeDuration = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (typeof value === "string") {
      setAbonDuration(value);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!abonDuration)
      return setMessage("abonDuration is " + Boolean(abonDuration));

    try {
      const { data, status } = await apiService.post<{
        abonement: { name: string; abonDuration: number; dateOfStart: Date };
      }>("/admin/createNewAbonement", {
        name: selectValue,
        abonementDuration: abonDuration,
        dateOfStart: abonDurationDates.start.toDate(),
      });

      if (status === 200) {
        console.log(data);
        setMessage("Succes!");
        setAbonDuration("");
        setAbonDurationDates({ start: dayjs() });
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  };

  const handleSlotSelect = async (slotInfo: SlotInfo) => {
    // console.log("Выбран диапазон:");
    // console.log("Start:", slotInfo.start);
    // console.log("End:", slotInfo.end);
    // console.log("Все слоты:", slotInfo.slots);
    // console.log("Действие:", slotInfo.action);

    try {
      const { data, status } = await apiService.post<CombinedWorkoutData[]>(
        "/admin/getTimeRangeWorkoutData",
        {
          dateOfRangeStart: slotInfo.start,
          dateOfRangeeEnd: slotInfo.end,
          clientName: selectValue,
        }
      );
      if (status === 200) {
        setCombinedWorkouts(data);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 4, md: 6 }}
      sx={{
        minHeight: "100vh",
        "@media(max-width:600px)": {
          minHeight: "max-content",
        },
      }}
    >
      <Grid size={{ xs: 12, md: 2 }}>
        <AppBox>
          <FormControl fullWidth>
            <InputLabel
              id="clients_label"
              sx={{
                "@media(max-width: 600px)": {
                  fontSize: "4vw",
                },
              }}
            >
              Клієнти
            </InputLabel>
            <Select
              sx={{
                "@media(max-width: 600px)": {
                  fontSize: "4vw",
                },
              }}
              labelId="clients_label"
              id="clients_select"
              value={selectValue}
              label="clients"
              onChange={handleChangeClient}
            >
              {clients.map((client) => (
                <MenuItem
                  value={client.name}
                  key={client.email}
                  sx={{
                    "@media(max-width: 600px)": {
                      fontSize: "4vw",
                    },
                  }}
                >
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AppBox>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <AppBox>
          <Typography
            variant="h2"
            marginBottom={"1rem"}
            sx={{
              "@media(max-width: 600px)": {
                fontSize: "5vw",
              },
            }}
          >
            Відвідування
          </Typography>
          <CalendarComponent
            events={clientWorkouts}
            selectedEvent={selectedEvent}
            onSelectEvent={onSelectEventHandler}
            selectable
            onSelectSlot={handleSlotSelect}
          />
          {selectValue && (
            <WorkoutCreator
              date={selectedEvent?.start}
              exercises={allExrecises}
              name={selectValue}
              apiService={apiService}
            />
          )}
          {selectValue && (
            <DisplayingPassedWorkouts workoutData={combinedWorkouts} />
          )}
          {token && <TableOfClients apiService={apiService} />}
        </AppBox>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <AppBox>
          {selectValue !== "" ? (
            <Stack spacing={2}>
              <SnackbarContent
                sx={{
                  marginTop: "1rem",
                  borderRadius: "1rem",
                  backgroundColor: "var(--blue)",
                }}
                message={
                  <>
                    {" "}
                    <Typography
                      variant="body2"
                      fontSize={{ xs: "1.5vh", md: "1rem" }}
                    >
                      Кількість тренувань, що залишилися{" "}
                      {currentAbonement?.abonementDuration}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontSize={{ xs: "1.5vh", md: "1rem" }}
                    >
                      Дата старту абонементу{" "}
                      {dayjs(currentAbonement?.dateOfCreation).format(
                        "DD.MM.YYYY"
                      )}
                    </Typography>
                  </>
                }
              />
              <SnackbarContent
                message={
                  <form onSubmit={handleSubmit}>
                    <Typography
                      variant="h5"
                      fontSize={"2rem"}
                      fontWeight={"700"}
                      sx={{
                        "@media(max-width: 600px)": {
                          fontSize: "4vw",
                        },
                      }}
                    >
                      Встановити дату початку та кінця абонементу для{" "}
                      {selectValue}
                    </Typography>
                    <FormControl fullWidth sx={{ marginTop: "1rem" }}>
                      <InputLabel
                        id="duration_label"
                        sx={{
                          "@media(max-width: 600px)": {
                            fontSize: "4vw",
                          },
                        }}
                      >
                        Кількість тренувань
                      </InputLabel>
                      <Select
                        labelId="duration_label"
                        id="duration_select"
                        value={abonDuration}
                        label="duration"
                        onChange={handleChangeDuration}
                        sx={{
                          "@media(max-width: 600px)": {
                            fontSize: "4vw",
                          },
                        }}
                      >
                        <MenuItem
                          value={"5"}
                          sx={{
                            "@media(max-width: 600px)": {
                              fontSize: "4vw",
                            },
                          }}
                        >
                          5
                        </MenuItem>
                        <MenuItem
                          value={"8"}
                          sx={{
                            "@media(max-width: 600px)": {
                              fontSize: "4vw",
                            },
                          }}
                        >
                          8
                        </MenuItem>
                        <MenuItem
                          value={"10"}
                          sx={{
                            "@media(max-width: 600px)": {
                              fontSize: "4vw",
                            },
                          }}
                        >
                          10
                        </MenuItem>
                        <MenuItem
                          value={"12"}
                          sx={{
                            "@media(max-width: 600px)": {
                              fontSize: "4vw",
                            },
                          }}
                        >
                          12
                        </MenuItem>
                      </Select>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            marginTop: "1rem",
                            "@media(max-width: 600px)": {
                              ".MuiFormLabel-root": {
                                fontSize: "4vw",
                              },
                              ".MuiPickersInputBase-root span": {
                                fontSize: "4vw",
                              },
                              ".MuiInputAdornment-root button svg": {
                                fontSize: "4vw",
                              },
                              ".MuiPickersToolbar-content .MuiTypography-root":
                                {
                                  fontSize: "4vw",
                                },
                            },
                          }}
                          label="Вибери дату початку"
                          value={abonDurationDates?.start}
                          onChange={(newValue) => {
                            if (newValue) {
                              setAbonDurationDates((prev) => ({
                                ...prev,
                                start: newValue,
                              }));
                            }
                          }}
                          format="DD.MM.YYYY"
                        />
                      </LocalizationProvider>
                    </FormControl>
                    <AppButton type="submit" variant="outlined">
                      Створити абонемент
                    </AppButton>
                    <Typography
                      component={"p"}
                      textAlign={"center"}
                      padding={"1rem"}
                    >
                      {message}
                    </Typography>
                  </form>
                }
                sx={{
                  marginTop: "1rem",
                  borderRadius: "1rem",
                  backgroundColor: "var(--blue)",
                }}
              />
              {/* <SnackbarContent
                message={<TableOfClients apiService={apiService} />}
                sx={{
                  marginTop: "1rem",
                  borderRadius: "1rem",
                  backgroundColor: "var(--blue)",
                }}
              /> */}
            </Stack>
          ) : (
            <Stack>
              <SnackbarContent
                sx={{
                  marginTop: "1rem",
                  borderRadius: "1rem",
                  backgroundColor: "var(--blue)",
                }}
                message={<Typography variant="h2">Вибери клієнта</Typography>}
              />
            </Stack>
          )}
        </AppBox>
      </Grid>
    </Grid>
  );
};

export default Clients;

"use client";
import SocketTable from "@/components/SocketTable/SocketTable";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import ApiService from "@/app/apiService/apiService";
import { SocketEventsEnum } from "../../layout";
import { useSocketContext } from "@/app/Contexts/SocketContext/SoketContext";

import { WorkoutResultType, WplanRespTypes, ClientTypes } from "@/Types/types";
import NotificationForm from "@/components/NotificationForm/NotificationForm";

const SocketPage = () => {
  const session = useSession();
  const { socket } = useSocketContext();
  const [wPlans, setWplans] = useState<WplanRespTypes[]>([]);
  const name = session.data?.user.name;
  const token = session.data?.user.accessToken;
  const role = session.data?.user.role;

  const apiService = new ApiService(process.env.NEXT_PUBLIC_SERVER_URL!, token);

  const getAllWorkoutsPlanForToday = async () => {
    try {
      const { data, status } = await apiService.get<WplanRespTypes[]>(
        "/admin/getAllWorkoutPlansForToday"
      );
      if (status === 200) {
        setWplans(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const [clients, setClients] = useState<ClientTypes[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [notMessage, setNotMessage] = useState({ title: "", message: "" });
  const [clientWhoAreTrainingNow, setClientWhoAreTrainingNow] = useState<
    WorkoutResultType[]
  >([]);

  const handleGetClients = (data?: string) => {
    if (!data) return;

    const parsedData: WorkoutResultType[] = JSON.parse(data);

    setClientWhoAreTrainingNow((prev) => {
      const updated = [...prev];

      parsedData.forEach((newClient) => {
        const index = updated.findIndex(
          (c) => c.clientName === newClient.clientName
        );

        if (index !== -1) {
          updated[index] = newClient;
        } else {
          updated.push(newClient);
        }
      });

      return updated;
    });
  };

  const updateServerWorkout = (data: string) => {
    const newWorkoutData: Omit<WorkoutResultType, "clientName"> & {
      name: string;
    } = JSON.parse(data);
    console.log(newWorkoutData);

    if (newWorkoutData) {
      setClientWhoAreTrainingNow((state) => {
        const clientExists = state.some(
          (ex) => ex.clientName === newWorkoutData.name
        );

        if (!clientExists) {
          return [
            ...state,
            {
              ...newWorkoutData,
              clientName: newWorkoutData.name,
              workoutResult: newWorkoutData.workoutResult,
            },
          ];
        }

        return state.map((client) =>
          client.clientName === newWorkoutData.name
            ? { ...client, workoutResult: newWorkoutData.workoutResult }
            : client
        );
      });
    }
  };

  const getClientsWhoAreTrainingNow = async () => {
    const { data, status } = await apiService.get<WorkoutResultType[]>(
      "/admin/getClientsWhoAreTrainingNow"
    );
    if (status === 200) {
      setClientWhoAreTrainingNow(data);
    }
  };

  const onNotificationChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNotMessage((state) => ({ ...state, [name]: value }));
  };

  const onSubmitNotification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!socket) {
      alert("Soket is not connected");
      return;
    }
    console.log(selectedClients);
    console.log(notMessage);
    const newNotification = {
      clientName: selectedClients[selectedClients.length - 1],
      ...notMessage,
    }; // Костыль

    socket.emit(
      SocketEventsEnum.newNotification,
      JSON.stringify(newNotification)
    );

    setNotMessage({ title: "", message: "" });
  };

  const onSelectClientForSendNotification = (clientName: string) => {
    setSelectedClients((state) => {
      if (state.includes(clientName)) return state;
      return [...state, clientName];
    });
  };

  useEffect(() => {
    (async () => {
      try {
        await getClientsWhoAreTrainingNow();
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {};
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(SocketEventsEnum.getClientWhoAreTrainingNow, handleGetClients);

    socket.on(SocketEventsEnum.sendUpdatedWorkoutToAdmin, updateServerWorkout);

    return () => {
      socket.off(SocketEventsEnum.getClientWhoAreTrainingNow, handleGetClients);
      socket.off(SocketEventsEnum.sendUpdatedWorkoutToAdmin);
    };
  }, [socket]);

  useEffect(() => {
    (async () => {
      await getAllWorkoutsPlanForToday();
    })();
  }, []);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <AppBox>
          <SocketTable
            wPlans={wPlans}
            clientWhoAreTrainingNow={clientWhoAreTrainingNow}
            onSelectClientForSendNotification={
              onSelectClientForSendNotification
            }
          />
        </AppBox>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <AppBox>
          <NotificationForm
            onSubmitNotification={onSubmitNotification}
            onNotificationChange={onNotificationChange}
            notMessage={notMessage}
            selectedClients={selectedClients ?? []}
          />
        </AppBox>
      </Grid>
    </Grid>
  );
};

export default SocketPage;

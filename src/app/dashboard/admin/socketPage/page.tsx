"use client";
import SocketTable from "@/components/SocketTable/SocketTable";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ApiService from "@/app/apiService/apiService";
import { SocketEventsEnum } from "../../layout";
import { usePathname } from "next/navigation";
import { useSocketContext } from "@/app/Contexts/SocketContext/SoketContext";

import { WorkoutResultType, WplanRespTypes } from "@/Types/types";

const SocketPage = () => {
  const session = useSession();
  const { socket } = useSocketContext();
  const [wPlans, setWplans] = useState<WplanRespTypes[]>([]);
  const name = session.data?.user.name;
  const token = session.data?.user.accessToken;
  const role = session.data?.user.role;
  const pathname = usePathname();
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

  const [selectedClients, setSelectedClients] = useState<string[]>();
  const [clientWhoAreTrainingNow, setClientWhoAreTrainingNow] = useState<
    WorkoutResultType[]
  >([]);
  console.log(clientWhoAreTrainingNow);

  const handleGetClients = (data?: string) => {
    if (!data) return;
    const parsedData: WorkoutResultType[] = JSON.parse(data);

    setClientWhoAreTrainingNow(parsedData);
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

        if (!clientExists) return state;

        return state.map((client) =>
          client.clientName === newWorkoutData.name
            ? { ...client, workoutResult: newWorkoutData.workoutResult }
            : client
        );
      });
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit(SocketEventsEnum.getClientWhoAreTrainingNow);

    return () => {};
  }, [pathname, socket]);

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
          />
        </AppBox>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <AppBox>Additional</AppBox>
      </Grid>
    </Grid>
  );
};

export default SocketPage;

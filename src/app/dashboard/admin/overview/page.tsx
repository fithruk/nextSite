"use client";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import ApiService from "@/app/apiService/apiService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AllTameClientsTable, {
  AllTimeClientsData,
} from "@/components/AllTameClientsTable/AllTameClientsTable";

const AdminOverview = () => {
  const session = useSession();
  const name = session.data?.user.name;
  const token = session.data?.user.accessToken;

  const [allTimeClients, setAllTimeClients] = useState<AllTimeClientsData[]>(
    []
  );

  const apiService = new ApiService(process.env.NEXT_PUBLIC_SERVER_URL!, token);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data, status } = await apiService.get<
          { name: string; workoutDates: string[] }[]
        >("admin/getAllTimeClients");
        if (status === 200) {
          const newData: AllTimeClientsData[] = data.map((wk) => ({
            ...wk,
            workoutsAmount: wk.workoutDates.length,
          })) as AllTimeClientsData[];
          setAllTimeClients(newData);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    })();
  }, [token]);
  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 8 }}>
        <AppBox
          width={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <AllTameClientsTable allTimeClients={allTimeClients} />
        </AppBox>
      </Grid>
    </Grid>
  );
};

export default AdminOverview;

"use client";
import { CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import ApiService from "@/app/apiService/apiService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AbonDataTypes } from "@/Types/types";

import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import CommonStatistics from "@/components/Statistics/CommonStatictics/CommonStatistics";
import StatisticsComingSoon from "@/components/StatisticsComingSoon/StatisticsComingSoon";
import DetailedStatistics from "@/components/Statistics/DetailedStatistics/DetailedStatistics";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppError from "@/app/Error/Error";

dayjs.extend(utc);

export type OverviewRespType = Partial<{
  abonement: AbonDataTypes;
  totalWorkouts: number;
  totalReps: number;
  strengthProgression: {
    exercise: string;
    date: string;
    averageWeight: number;
  }[];
  workoutDates: Date[];
  maxWeights: Record<string, number>;
  tonnagePerWorkout: { date: string; tonnage: Record<string, number> }[];
  frequentMuscleGroups: Record<string, number>;
}>;

const Overview = () => {
  const { getItem } = useLocalStorage();
  const session = useSession();
  const name = session.data?.user.name;
  const token =
    session.data?.user.accessToken ?? (getItem("authToken") as string);
  const apiService = new ApiService(process.env.NEXT_PUBLIC_SERVER_URL!, token);
  const router = useRouter();
  const [commonStat, setCommonStat] = useState<OverviewRespType | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session.data?.user.role === "admin") {
      router.push("/dashboard/admin/overview");
    }
    (async () => {
      try {
        const { data, status } = await apiService.get<OverviewRespType>(
          `/statistics/getStatisticsByName/${encodeURIComponent(name ?? "")}`
        );
        if (status === 200) {
          setCommonStat(data);
          setIsLoading(false);
        }

        if (status === 401) {
          throw AppError.UnauthorizedError();
        }
      } catch (error) {
        if (error instanceof AppError) {
          if (error.status === 401) {
            alert(error.message);
            router.push("/login");
            return;
          }
        }
        alert((error as Error).message);
      }
    })();
  }, [session]);

  return (
    <Grid container spacing={{ xs: 2, md: 4 }}>
      <Grid
        size={{ xs: 12, md: 8 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        {/* <StatisticsComingSoon /> */}
        {isLoading && (
          <AppBox
            height={"100%"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress color="error" />
          </AppBox>
        )}
        {!isLoading && commonStat?.totalReps === 0 && <StatisticsComingSoon />}
        {!isLoading && commonStat?.totalReps !== 0 && (
          <DetailedStatistics
            tonnagePerWorkout={commonStat?.tonnagePerWorkout}
            maxWeights={commonStat?.maxWeights}
            frequentMuscleGroups={commonStat?.frequentMuscleGroups}
            abonement={commonStat?.abonement}
          />
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <AppBox>
          <CommonStatistics
            {...commonStat}
            clientName={name ?? ""}
            apiApiservice={apiService}
          />
        </AppBox>
      </Grid>
    </Grid>
  );
};

export default Overview;

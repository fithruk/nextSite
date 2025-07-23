"use client";
import { Grid } from "@mui/material";

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
  const session = useSession();
  const name = session.data?.user.name;
  const token = session.data?.user.accessToken;
  const apiService = new ApiService(process.env.NEXT_PUBLIC_SERVER_URL!, token);
  const [commonStat, setCommonStat] = useState<OverviewRespType | null>();
  console.log(commonStat);

  useEffect(() => {
    (async () => {
      const { data, status } = await apiService.get<OverviewRespType>(
        `/statistics/getStatisticsByName/${encodeURIComponent(name ?? "")}`
      );
      if (status === 200) {
        setCommonStat(data);
      }
    })();
  }, []);

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
        <DetailedStatistics
          tonnagePerWorkout={commonStat?.tonnagePerWorkout}
          maxWeights={commonStat?.maxWeights}
          frequentMuscleGroups={commonStat?.frequentMuscleGroups}
          abonement={commonStat?.abonement}
        />
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

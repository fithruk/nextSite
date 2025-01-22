"use client";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { useLoadFromStorageOrServer } from "@/hooks/useLoadFromStorageorServer";
import { LocalStorageKeys } from "@/localSrorageKeys/localStorageKeys";
import { FoodPlanType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FoodMenuItemsList from "../FoodMenuItemsList/FoodMenuItemsList";

const WeekFoodPlan = () => {
  const [foodState, setFoodState] = useState<FoodPlanType | null>(null);

  const session = useSession();
  const email = session.data?.user.email || "";
  const token = session.data?.user.token || "";
  const data = useLoadFromStorageOrServer<FoodPlanType>({
    storageKey: LocalStorageKeys.generatedFoodPlan,
    apiRoute: `/api/foodService/getFood/${email}`,
    email,
    token,
  });

  useEffect(() => {
    if (data) {
      setFoodState(data);
    }
  }, [data]);

  return (
    <>
      <ul>
        <Typography type="h2">
          Food values of preview <br /> calculation
        </Typography>
        {foodState && <FoodMenuItemsList {...foodState} />}
      </ul>
    </>
  );
};

export default WeekFoodPlan;

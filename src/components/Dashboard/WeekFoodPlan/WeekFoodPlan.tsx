//import WFPlanStyles from "./weekFoodPlan.module.css";

import { Typography } from "@/components/CommonComponents/Typography/Typography";

import WeekFoodItem from "./WeakFoodItem/WeakFoodItem";
const weakplanArray = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const WeekFoodPlan = () => {
  return (
    <ul>
      <Typography type="h2">food weak plan</Typography>
      {weakplanArray.map((day) => (
        <WeekFoodItem day={day} key={day} />
      ))}
    </ul>
  );
};

export default WeekFoodPlan;

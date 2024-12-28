"use client";
import calculatorStyles from "./caloriesCalculator.module.css";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { FormEvent, MouseEvent, useState, useRef, useEffect } from "react";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { Input } from "@/components/CommonComponents/Input/Input";
import { Select } from "@/components/CommonComponents/Select/Select";

type ActivityOptionsTypes =
  | "Basic"
  | "Minimum/not load"
  | "3 times per week"
  | "5 times per week"
  | "5 times per week with high intence"
  | "Every day"
  | " Every day and physical work";

const activityOptions = [
  "Basic",
  "Minimum/not load",
  "3 times per week",
  "5 times per week",
  "5 times per week with high intence",
  "Every day",
  " Every day and physical work",
];

const CaloriesCalculator = () => {
  const [selectValue, setSelectValue] = useState<ActivityOptionsTypes>(
    activityOptions[0] as ActivityOptionsTypes
  );
  const formRef = useRef<HTMLFormElement | null>(null);
  const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget) {
      setSelectValue(e.currentTarget.textContent as ActivityOptionsTypes);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Array.from(new FormData(formRef.current!));
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Typography type="h2">CaloriesCalculator</Typography>
      <Input type="number" value={33} disabled name="age" labalValue="Age" />
      <Input
        type="text"
        value={"Male"}
        disabled
        name="Male"
        labalValue="Gender"
      />
      <Input
        type="number"
        min={100}
        max={250}
        name="height"
        labalValue="Height"
      />
      <Typography type="p">Choose activity</Typography>
      <Select currentValue={selectValue} clickHandler={clickHandler}>
        {activityOptions}
      </Select>
      <AppButton variant="secondary" type="submit">
        Calculate
      </AppButton>
    </form>
  );
};

export default CaloriesCalculator;

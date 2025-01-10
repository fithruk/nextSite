"use client";
import { CaloriesCalculatorClass } from "@/classes/CaloriesCaculatorClass";
import calculatorStyles from "./caloriesCalculator.module.css";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FormEvent, MouseEvent, useState, ChangeEvent, useEffect } from "react";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { Input } from "@/components/CommonComponents/Input/Input";
import { Select } from "@/components/CommonComponents/Select/Select";
import { AppLink } from "@/components/CommonComponents/Link/Link";
import axios from "axios";
import { useSession } from "next-auth/react";

export type ActivityOptionsTypes =
  | "Basic"
  | "Minimum/not load"
  | "3 times per week"
  | "5 times per week"
  | "5 times per week with high intence"
  | "Every day"
  | "Every day and physical work";

const activityOptions = [
  "Basic",
  "Minimum/not load",
  "3 times per week",
  "5 times per week",
  "5 times per week with high intence",
  "Every day",
  "Every day and physical work",
];

export type FoodPriorityOptionsTypes =
  | "Grow weight"
  | "Loss weight"
  | "Maintain weight";

const foodPriorityOptions = ["Grow weight", "Loss weight", "Maintain weight"];

type InputValuesStateProps = {
  age: number;
  gender: "Male" | "Female";
  height: number;
  weight: number;
};

type CompliteRegistrationResponceType = {
  isUserCompliteRegistration: boolean;
  gender?: "Male" | "Female";
  dateOfBirdth?: Date;
};

const temporaryInitialState: InputValuesStateProps = {
  age: 0,
  gender: "Male",
  height: 0,
  weight: 0,
};

export type CaloriesCalculatorUserAsnswerType = {
  activity: ActivityOptionsTypes;
  foodPriority: FoodPriorityOptionsTypes;
  age: number;
  gender: "Male" | "Female";
  height: number;
  weight: number;
};

const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Проверяем, был ли день рождения в текущем году
  const isBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  // Если день рождения не прошел, уменьшаем возраст на 1
  if (!isBirthdayPassed) {
    age--;
  }

  return age;
};

const CaloriesCalculator = () => {
  const [selectValue, setSelectValue] = useState<ActivityOptionsTypes>(
    activityOptions[0] as ActivityOptionsTypes
  );

  const [foodPriority, setFoodPriority] = useState<FoodPriorityOptionsTypes>(
    foodPriorityOptions[1] as FoodPriorityOptionsTypes
  );

  const [inputValues, setInputValues] = useState<InputValuesStateProps>(
    temporaryInitialState
  );

  const [isCompliteRegistration, setIsCompliteRegistration] =
    useState<boolean>(false);

  const { setItem, getItem } =
    useLocalStorage<CaloriesCalculatorUserAsnswerType>();

  const [totalCalories, setTotalCalories] = useState<number | null>(null);

  const session = useSession();
  const token = session.data?.user.token;
  const email = session.data?.user.email;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputValues((state) => ({
      ...state,
      [name]: +value,
    }));
  };

  const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
    const textContent = e.currentTarget.textContent?.trim();
    if (
      textContent &&
      activityOptions.includes(textContent as ActivityOptionsTypes)
    ) {
      setSelectValue(textContent as ActivityOptionsTypes);
    } else {
      setFoodPriority(textContent as FoodPriorityOptionsTypes);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const calculatorValues = {
      ...inputValues,
      activity: selectValue,
      foodPriority,
    };

    setItem("userCaloriesCalculatorAnswers", calculatorValues);
    const totalMinimalCalories =
      CaloriesCalculatorClass.CountMinimalCalories(calculatorValues);
    console.log(totalMinimalCalories + " totalMinimalCalories");
    setTotalCalories(totalMinimalCalories);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data, status } =
          await axios.get<CompliteRegistrationResponceType>(
            "/api/shapeVolumeService/isUserCompleteRegistration",
            {
              params: {
                token,
                email,
              },
            }
          );

        if (status === 200) {
          setIsCompliteRegistration(data.isUserCompliteRegistration);

          if (data.dateOfBirdth && data.gender) {
            setInputValues((state) => ({
              ...state,
              gender: data.gender!,
              age: calculateAge(data.dateOfBirdth!.toString()),
            }));
            const answers = getItem("userCaloriesCalculatorAnswers");
            if (answers) {
              setInputValues((state) => ({
                ...state,
                ...answers,
              }));
              setSelectValue(answers.activity);
              setFoodPriority(answers.foodPriority);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return isCompliteRegistration ? (
    <form onSubmit={handleSubmit} className={calculatorStyles.container}>
      <Typography type="h2">
        {totalCalories ? `Result is ${totalCalories}` : "Calories calculator"}
      </Typography>
      <Input
        type="number"
        value={inputValues.age}
        disabled
        name="age"
        labalValue="Age"
      />
      <Input
        type="text"
        value={inputValues.gender}
        disabled
        name="gender"
        labalValue="Gender"
      />
      <Input
        onChange={handleChange}
        type="number"
        min={100}
        max={250}
        name="height"
        value={inputValues.height}
        labalValue="Height"
      />
      <Input
        onChange={handleChange}
        type="number"
        min={25}
        max={200}
        name="weight"
        labalValue="Weight"
        value={inputValues.weight}
      />
      <Typography type="p">Choose activity</Typography>
      <Select currentValue={selectValue} clickHandler={clickHandler}>
        {activityOptions}
      </Select>
      <Typography type="p">You want </Typography>
      <Select currentValue={foodPriority} clickHandler={clickHandler}>
        {foodPriorityOptions}
      </Select>
      <AppButton variant="secondary" type="submit">
        Calculate
      </AppButton>
    </form>
  ) : (
    <Typography type="h2">
      Finish a registration {<br />} on a Profile page
      <Typography type="p">
        <AppLink href={"/dashboard/profile"}>to Profile page</AppLink>
      </Typography>
    </Typography>
  );
};

export default CaloriesCalculator;

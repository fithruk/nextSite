"use client";
import calculatorStyles from "./caloriesCalculator.module.css";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { FormEvent, MouseEvent, useState, ChangeEvent, useEffect } from "react";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { Input } from "@/components/CommonComponents/Input/Input";
import { Select } from "@/components/CommonComponents/Select/Select";
import { AppLink } from "@/components/CommonComponents/Link/Link";
import axios from "axios";
import { useSession } from "next-auth/react";

type ActivityOptionsTypes =
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

type InputValuesStateProps = {
  age: number;
  gender: "male" | "female";
  height: number;
  weight: number;
};

type CompliteRegistrationResponceType = {
  isUserCompliteRegistration: boolean;
};

const temporaryInitialState: InputValuesStateProps = {
  age: 0,
  gender: "male",
  height: 0,
  weight: 0,
};

const CaloriesCalculator = () => {
  const [selectValue, setSelectValue] = useState<ActivityOptionsTypes>(
    activityOptions[0] as ActivityOptionsTypes
  );

  const [inputValues, setInputValues] = useState<InputValuesStateProps>(
    temporaryInitialState
  );

  const [isCompliteRegistration, setIsCompliteRegistration] =
    useState<boolean>(false);

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
    if (e.currentTarget) {
      setSelectValue(e.currentTarget.textContent as ActivityOptionsTypes);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //const formData = Array.from(new FormData(formRef.current!));
    console.log(inputValues);
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
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return isCompliteRegistration ? (
    <form onSubmit={handleSubmit}>
      <Typography type="h2">CaloriesCalculator</Typography>
      <Input type="number" value={33} disabled name="age" labalValue="Age" />
      <Input
        type="text"
        value={"Male"}
        disabled
        name="male"
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
      <AppButton variant="secondary" type="submit">
        Calculate
      </AppButton>
    </form>
  ) : (
    <Typography type="h2">
      Finish a registration on a Profile page{" "}
      <Typography type="p">
        <AppLink href={"/dashboard/profile"}>to Profile page</AppLink>
      </Typography>
    </Typography>
  );
};

export default CaloriesCalculator;

"use client";
import profileStyles from "./profile.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { Input } from "@/components/CommonComponents/Input/Input";
import { ChangeEvent, useEffect, useState, useRef, FormEvent } from "react";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useSession } from "next-auth/react";
import axios from "axios";

const surfaceVolume = [
  "weight",
  "waist",
  "leftHip",
  "rightHip",
  "chest",
  "neck",
  "leftBiceps",
  "rightBiceps",
  "leftCalve",
  "rightCalve",
];

type FormImputsProps = {
  weight: number;
  waist: number;
  leftHip: number;
  rightHip: number;
  chest: number;
  neck: number;
  leftBiceps: number;
  rightBiceps: number;
  leftCalve: number;
  rightCalve: number;
};

const Profile = () => {
  const minRangeValue = 1;
  const maxRangeValue = 200;
  const [formsInputs, setFormsInputs] = useState<FormImputsProps>({
    weight: 0,
    waist: 0,
    leftHip: 0,
    rightHip: 0,
    chest: 0,
    neck: 0,
    leftBiceps: 0,
    rightBiceps: 0,
    leftCalve: 0,
    rightCalve: 0,
  });
  const session = useSession();

  const inputsParrentRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name in formsInputs) {
      setFormsInputs((state) => ({
        ...state,
        [name]: +value,
      }));

      const percentage =
        ((+value - minRangeValue) / (maxRangeValue - minRangeValue)) * 100;
      e.currentTarget.style.background = `linear-gradient(to right, #ff0000 0%, #ff0000 ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(session.data?.user.email);
    console.log(session.data?.user.name);
  };
  useEffect(() => {
    if (inputsParrentRef.current) {
      const elements = Array.from(inputsParrentRef.current.children);

      elements.forEach((element) => {
        const inputs = Array.from(element.children)
          .map((item) =>
            Array.from(item.children).find(
              (item) => item instanceof HTMLInputElement
            )
          )
          .filter((item) => item !== undefined) as HTMLInputElement[];

        inputs.forEach((input) => {
          const min = parseFloat(input.min) || 1;
          const max = parseFloat(input.max) || 200;
          const value = parseFloat(input.value) || 0;
          const percentage = ((value - min) / (max - min)) * 100;

          input.style.background = `linear-gradient(to right, #ff0000 0%, #ff0000 ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
        });
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { data, status } = await axios.get("/api/shapeVolumeService", {
        params: {
          token: session.data?.user.token,
          email: session.data?.user.email,
        },
      });
    })();
  }, []);

  return (
    <div className={profileStyles.container}>
      <Typography type="h2">Edit your profile</Typography>
      <Typography type="p">
        Here you can change the volume of your figure and compare it with
        previous indicators, as well as check the progress.
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={profileStyles.columns} ref={inputsParrentRef}>
          {" "}
          <div className={profileStyles.column}>
            {surfaceVolume.map((item, ind, arr) => {
              if (ind < arr.length / 2) {
                return (
                  <>
                    <Input
                      onChange={handleChange}
                      name={item}
                      key={item}
                      placeholder={item}
                      labalValue={`Preview value of ${item} is 56, it was chaked 23.05.2025 (90 days ago)`}
                      max={maxRangeValue}
                      min={minRangeValue}
                      type="range"
                      value={formsInputs[item as keyof FormImputsProps]}
                    />
                    <Typography type="p">
                      {formsInputs[item as keyof FormImputsProps]} см.
                    </Typography>
                  </>
                );
              }
            })}
          </div>
          <div className={profileStyles.column}>
            {surfaceVolume.map((item, ind, arr) => {
              if (ind >= arr.length / 2) {
                return (
                  <>
                    <Input
                      onChange={handleChange}
                      name={item}
                      key={item}
                      placeholder={item}
                      labalValue={`Preview value of ${item} is 56, it was chaked 23.05.2025 (90 days ago)`}
                      max={maxRangeValue}
                      min={minRangeValue}
                      type="range"
                      value={formsInputs[item as keyof FormImputsProps]}
                    />
                    <Typography type="p">
                      {formsInputs[item as keyof FormImputsProps]}
                    </Typography>
                  </>
                );
              }
            })}
          </div>
        </div>
        <AppButton type="submit" variant="secondary">
          Submit
        </AppButton>
      </form>
    </div>
  );
};

export default Profile;

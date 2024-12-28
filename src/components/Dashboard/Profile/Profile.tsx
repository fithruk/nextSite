"use client";
import profileStyles from "./profile.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { Input } from "@/components/CommonComponents/Input/Input";
import { ChangeEvent, useEffect, useState, useRef, FormEvent } from "react";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ResponceType } from "@/app/api/shapeVolumeService/route";
import FinishRegistrationForm from "./finishRegistrationForm";

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

type ResponceTypeSpreaded = ResponceType & {
  isUserCompliteRegistration: boolean;
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

  const [formsInputsPreview, setFormsInputsPreview] = useState<FormImputsProps>(
    {
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
    }
  );
  const [dateOfLastDataChange, setDateOfLastDataChange] = useState<Date | null>(
    null
  );

  const [isFullRegistration, setIsFullRegistration] = useState<boolean>(false);
  const session = useSession();

  const token = session.data?.user.token;
  const email = session.data?.user.email;

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

  const prepareLabelString = (
    muscleName: string,
    value?: number,
    date?: Date | null
  ): string => {
    if (value && date) {
      const currentDate = new Date();
      const differenceInTime = currentDate.getTime() - new Date(date).getTime();
      const dayRange = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Разница в днях

      return `Preview value of ${muscleName} is ${value} cm, it was checked ${new Date(
        date
      ).toLocaleDateString()} (${dayRange} days ago)`;
    }
    return `Preview value of ${muscleName} was not chaked, create value now`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(session.data?.user.email);
    console.log(session.data?.user.name);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: responce, status } =
          await axios.get<ResponceTypeSpreaded>("/api/shapeVolumeService", {
            params: {
              token,
              email,
            },
            validateStatus(status) {
              return status === 200 || status === 202;
            },
          });

        if (status === 200) {
          setFormsInputs(responce.shapeRingsValues);
          setFormsInputsPreview(responce.shapeRingsValues);
          setDateOfLastDataChange(responce.date);
          setIsFullRegistration(!responce.isUserCompliteRegistration);
        }
        if (status === 202) {
          setIsFullRegistration(!responce.isUserCompliteRegistration);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
  }, [formsInputs]);

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
                      labalValue={prepareLabelString(
                        item,
                        formsInputsPreview[item as keyof FormImputsProps],
                        dateOfLastDataChange
                      )}
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
                      labalValue={prepareLabelString(
                        item,
                        formsInputsPreview[item as keyof FormImputsProps],
                        dateOfLastDataChange
                      )}
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
        </div>
        <AppButton type="submit" variant="secondary">
          Submit
        </AppButton>
      </form>
      {isFullRegistration && <FinishRegistrationForm />}
    </div>
  );
};

export default Profile;

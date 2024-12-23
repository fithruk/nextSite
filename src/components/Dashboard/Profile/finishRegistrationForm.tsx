"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import formStyles from "./profile.module.css";

import { Input } from "@/components/CommonComponents/Input/Input";
import { Typography } from "@/components/CommonComponents/Typography/Typography";

const genders = ["Male", "Female"];

const FinishRegistrationForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const session = useSession();
  const [isFormAppeared, setIsFormAppeared] = useState<boolean>(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);

    try {
      const { status } = await axios.post(
        "/api/shapeVolumeService/finishRegistration",
        {
          postData: Array.from(formData),
          email: session.data?.user.email,
          token: session.data?.user.token,
        }
      );
      console.log(status + " status");

      if (status !== 200) {
        alert("Somethink wenf vrong, try again later");
      }
      setIsFormAppeared(false);
    } catch (error) {
      alert(error);
    } finally {
      formRef.current?.reset();
    }
  };

  return isFormAppeared ? (
    <form
      className={formStyles.finishRegistration}
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <Typography type="h2">
        For finish a registration fill the rorm below
      </Typography>
      <div>
        <Typography type="p">Choose your gender</Typography>
        {genders.map((value) => (
          <Input
            type="radio"
            name={"gender"}
            labalValue={value}
            key={value}
            value={value}
          />
        ))}
      </div>
      <div>
        <Typography type="p">Choose your birthday</Typography>
        <Input
          name="date"
          type="date"
          labalValue="Date of birth"
          min="1960-01-01"
          max={`${new Date().getFullYear().toString()}-01-01`}
        />
      </div>
      <div>
        <Typography type="p">
          Check data about you, you can not chenge this data after send it to
          the database, or you have to tie with the admin and resolve that
          mistake
        </Typography>
        <Input
          labalValue={"Click me"}
          type="checkbox"
          name={"confirm"}
          required
        />
      </div>
      <div>
        <AppButton variant="secondary" type="submit">
          Submit
        </AppButton>
      </div>
    </form>
  ) : (
    <Typography type="p">Thanks for your attention</Typography>
  );
};

export default FinishRegistrationForm;

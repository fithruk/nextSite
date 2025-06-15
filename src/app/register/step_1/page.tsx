"use client";
import stepStyles from "../stepStyles.module.css";
import { useRouter, usePathname } from "next/navigation";
import {
  FormDataTypes,
  FormStep,
  useRegistration,
} from "@/app/Contexts/RegisterContext/RegisterContext";
import { AppInput } from "@/components/UI/AppInput/AppInput";
import { FormControl, Grid, Typography } from "@mui/material";
import { AppButton } from "@/components/UI/AppButton/AppButton";
import { ChangeEvent, useRef } from "react";
import {
  InputNameTypes,
  TextFieldsValidaror,
} from "@/components/Helpers/TextFieldsValidaror/TextFieldsValidaror";
import { AppBox } from "@/components/UI/AppBox/AppBox";

const RegisterStep_1 = () => {
  const currentStep: FormStep = "contactInfo";
  const { formData, updateFormData } = useRegistration();
  const router = useRouter();
  const path = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const numberOfStep = path.split("_")[1];
  const { phone, name, email, password } = formData.contactInfo;

  const clickToNextStepHandler = () => {
    const errors = [];
    const inputs: HTMLInputElement[] = Array.from(
      formRef.current?.querySelectorAll("input") || []
    );
    inputs.forEach((i) => {
      const { errorMessage, result } = TextFieldsValidaror.Validate(
        i.name as InputNameTypes,
        i.value
      );
      const errPh = i.parentElement?.parentElement?.querySelector("p");
      if (errPh) errPh.remove();
      if (!result) {
        errors.push(result);
        i.parentElement?.classList.add("Mui-error");
        const errorParagraph = document.createElement("p");
        errorParagraph.classList.add(stepStyles.errorMsg);

        i.parentElement?.parentElement?.append(errorParagraph);
        if (errorParagraph && errorMessage) {
          errorParagraph.innerText = errorMessage;
        }
      }
    });

    if (errors.length === 0) {
      router.push(`${process.env.NEXT_PUBLIC_CLIENT_URL}/register/step_2`);
    }
  };

  const onInputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    currentStep: FormStep
  ) => {
    updateFormData(
      currentStep,
      e.currentTarget.name.toLowerCase() as keyof FormDataTypes[typeof currentStep],
      e.currentTarget.value.toLowerCase() as keyof FormDataTypes[typeof currentStep]
    );
  };

  // height: 100%;
  //     display: flex
  // ;
  //     justify-content: space-between;

  return (
    <AppBox borderRadius={"1.6rem"} flexGrow={1}>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          px: { xs: 0, md: "15rem" },
          py: 0,
          height: "100%",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
            "@media (max-width:900px)": {
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
            },
          }}
          component={"form"}
          ref={formRef}
        >
          <Grid size={12}>
            <Typography
              variant="h2"
              className={stepStyles.stepSupTitle}
              textAlign={"center"}
              fontSize={{ xs: "2vh", md: "1rem" }}
            >
              Крок реєстрації {numberOfStep} / 2
            </Typography>
            <Typography
              variant="h3"
              className={stepStyles.stepSupTitle}
              textAlign={"center"}
              fontSize={{ xs: "2vh", md: "1rem" }}
            >
              Дайте відповіді на запитання:
            </Typography>
          </Grid>
          <Grid size={12}>
            <AppInput
              inputType="phone"
              name="phone"
              value={phone}
              isRequaired
              onChange={(e) => onInputHandler(e, currentStep)}
            />
          </Grid>
          <Grid size={12}>
            <AppInput
              inputType="name"
              name="name"
              value={name}
              isRequaired
              onChange={(e) => onInputHandler(e, currentStep)}
            />
          </Grid>
          <Grid size={12}>
            <AppInput
              inputType="email"
              name="email"
              value={email}
              isRequaired
              onChange={(e) => onInputHandler(e, currentStep)}
            />
          </Grid>
          <Grid size={12}>
            <AppInput
              inputType="password"
              name="password"
              value={password}
              isRequaired
              onChange={(e) => onInputHandler(e, currentStep)}
            />
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={+numberOfStep > 1 ? "space-between" : "flex-end"}
          >
            {+numberOfStep > 1 && (
              <AppButton type="button">⬅ Попередній</AppButton>
            )}
            <AppButton type="button" onClick={clickToNextStepHandler}>
              {+numberOfStep === 2 ? "Зберегти результати" : "Наступний крок ➡"}
            </AppButton>
          </Grid>
        </FormControl>
      </Grid>
    </AppBox>
  );
};

export default RegisterStep_1;

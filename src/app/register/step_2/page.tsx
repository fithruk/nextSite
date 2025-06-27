"use client";
import stepStyles from "../stepStyles.module.css";
import { useRouter, usePathname } from "next/navigation";
import {
  FormDataTypes,
  FormStep,
  useRegistration,
} from "@/app/Contexts/RegisterContext/RegisterContext";
import { AppInput } from "@/components/UI/AppInput/AppInput";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import { FormControl, Grid, Typography } from "@mui/material";
import { AppButton } from "@/components/UI/AppButton/AppButton";
import { ChangeEvent, FormEvent, useRef } from "react";
import {
  InputNameTypes,
  TextFieldsValidaror,
} from "@/components/Helpers/TextFieldsValidaror/TextFieldsValidaror";
import ApiService from "@/app/apiService/apiService";

type AnswerType = {
  user: {
    email: string;
    name: string;
    _id?: string;
  };
};

const RegisterStep_2 = () => {
  const currentStep: FormStep = "healthData";
  const { formData, updateFormData } = useRegistration();
  const router = useRouter();
  const path = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const numberOfStep = path.split("_")[1];
  const { chronicDiseases, injuries, workoutExperience } = formData.healthData;

  const clickToPrevStepHandler = () => {
    router.push(`${process.env.NEXT_PUBLIC_CLIENT_URL}/register/step_1`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      const apiService = new ApiService(process.env.NEXT_PUBLIC_SERVER_URL!);
      formData.contactInfo.name = formData.contactInfo.name.toLowerCase();
      formData.contactInfo.email = formData.contactInfo.email.toLowerCase();
      const { status } = await apiService.post<AnswerType>(
        "/auth/registration",
        {
          contactInfo: formData.contactInfo,
          healthData: formData.healthData,
        }
      );
      if (status === 200) {
        alert(
          "Реєстрація пройшла успішно, ви будете перенаправлені на сторінку логіна"
        );
        router.push("/login");
      }
      if (status === 409) {
        alert("Користувач з таким емейлом вже зареєстрований");
        router.push("/login");
      }
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

  return (
    <AppBox borderRadius={"1.6rem"} flexGrow={1}>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          px: { xs: 0, md: "30rem" },
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
          onSubmit={handleSubmit}
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
              inputType="chronicDiseases"
              name="chronicDiseases"
              value={chronicDiseases ?? ""}
              isTextArea
              onChange={(e) => onInputHandler(e, currentStep)}
            />
          </Grid>
          <Grid size={12}>
            <AppInput
              inputType="injuries"
              name="injuries"
              value={injuries ?? ""}
              isTextArea
              onChange={(e) => onInputHandler(e, currentStep)}
            />
          </Grid>
          <Grid size={12}>
            <AppInput
              inputType="workoutExperience"
              name="workoutExperience"
              value={workoutExperience ?? ""}
              isTextArea
              onChange={(e) => onInputHandler(e, currentStep)}
            />
          </Grid>

          <Grid
            display={"flex"}
            justifyContent={+numberOfStep > 1 ? "space-between" : "flex-end"}
          >
            {+numberOfStep > 1 && (
              <AppButton type="button" onClick={clickToPrevStepHandler}>
                ⬅ Попередній
              </AppButton>
            )}
            <AppButton type={"submit"}>
              {+numberOfStep === 2 ? "Зберегти результати" : "Наступний крок ➡"}
            </AppButton>
          </Grid>
        </FormControl>
      </Grid>
    </AppBox>
  );
};

export default RegisterStep_2;

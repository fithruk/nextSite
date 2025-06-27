"use client";
import styles from "./RegisterStepVisualization.module.css";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import { FormControlLabel, Grid, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../../../public/images/logo/logo.png";
import AppCheckBox from "../UI/AppCheckBox/AppCheckBox";
import {
  // FormStep,
  FormDataTypes,
  useRegistration,
} from "@/app/Contexts/RegisterContext/RegisterContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type RegistrationVisualizationTypes = {
  label: "Контактні дані" | "Стан здоров'я";
  data: FormDataTypes[keyof FormDataTypes];
};

const RegisterStepVisualization = () => {
  const { formData } = useRegistration();
  const { contactInfo, healthData } = formData;
  const path = usePathname();
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  useEffect(() => {
    if (path) {
      const stepIndex = +path.split("_")[1];
      setCurrentStep(["Контактні дані", "Стан здоров'я"][stepIndex - 1]);
    }
  }, [path]);

  const steps: RegistrationVisualizationTypes[] = [
    { data: contactInfo, label: "Контактні дані" },
    { data: healthData, label: "Стан здоров'я" },
  ];

  return (
    <AppBox className={styles.container}>
      <Grid container flexDirection={"column"} spacing={4} padding={0}>
        <Grid
          sx={{
            position: "relative",
            height: "5rem",
            width: "5rem",
            borderRadius: "50%",
            overflow: "hidden",
            "@media (max-width:900px)": {
              height: "5vh",
              width: "5vh",
            },
          }}
          size={4}
        >
          <Image src={logo.src} fill style={{ objectFit: "fill" }} alt="logo" />
        </Grid>
        <Grid>
          <Typography
            variant="h4"
            color="#ffffff"
            fontSize={{ xs: "2.5vh", md: "1rem" }}
          >
            Реєстрація
          </Typography>
        </Grid>
        {steps.map((step) => (
          <Grid key={step.label}>
            <FormControlLabel
              control={
                <AppCheckBox
                  variant="rounded"
                  disabled
                  checked={Object.values(step.data).every(
                    (data) => data !== ""
                  )}
                />
              }
              sx={{
                opacity: step.label === currentStep ? 1 : 0.5,
              }}
              label={
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: {
                      xs: "2.5vh",
                      md: "1rem",
                    },
                    color: "#ffffff",
                  }}
                >
                  {step.label}
                </Typography>
              }
            />
          </Grid>
        ))}
      </Grid>
    </AppBox>
  );
};
export default RegisterStepVisualization;

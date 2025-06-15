"use client";

import inputStyles from "./inputStyles.module.css";
import { TextField, TextFieldProps } from "@mui/material";

type InputType =
  | "email"
  | "password"
  | "phone"
  | "name"
  | "chronicDiseases"
  | "injuries"
  | "workoutExperience";

type AppInputProps = {
  inputType: InputType;
  isRequaired?: boolean;
  isTextArea?: boolean;
  name: string;
  value: string;
} & TextFieldProps;

const AppInput = ({
  inputType,
  isRequaired,
  isTextArea,
  onChange,
  name,
  value,
  ...props
}: AppInputProps) => {
  const labels: Record<InputType, string> = {
    email: "Електронна пошта",
    password: "Пароль",
    phone: "Номер телефону",
    name: "Ім'я та прізвище",
    chronicDiseases: "Хронічні захворювання",
    injuries: "Травми",
    workoutExperience: "Досвід занять спротом",
  };

  const placeholders: Record<InputType, string> = {
    email: "youremail@gmail.com",
    password: "Пароль",
    phone: "+380...",
    name: "Вася Пупкін",
    chronicDiseases: "цукровий діабет, захворювання нирок і т.д. ...",
    injuries: "Розрив меніска, перелом ноги, струс мозку і т.д. ...",
    workoutExperience: "1 рік у тренажерному залі, або півроку бігу і т.д. ...",
  };

  const inputTypes: Record<InputType, string> = {
    email: "email",
    password: "password",
    phone: "tel",
    name: "name",
    chronicDiseases: "text",
    injuries: "text",
    workoutExperience: "text",
  };

  return (
    <TextField
      className={inputStyles.input}
      type={inputTypes[inputType]}
      name={name}
      variant="outlined"
      label={labels[inputType]}
      placeholder={placeholders[inputType]}
      autoComplete="off"
      required={isRequaired}
      multiline={isTextArea}
      onChange={onChange}
      value={value}
      fullWidth
      sx={{
        marginTop: "2rem",
        boxShadow: "0px 10px 20px rgba(184, 200, 224, 0.222055)",
        width: "100%",
        fontSize: { xs: "2vh", md: "1rem" },

        ".MuiInputLabel-animated": {
          "@media (max-width:600px)": {
            fontSize: "2vh",
          },
        },

        "& .MuiOutlinedInput-root": {
          borderRadius: "0.6rem",
          border: "1px solid #D8E0F0",
          "@media (max-width:600px)": {
            fontSize: "2vh",
            borderRadius: "1.5vh",
          },

          "&.Mui-focused fieldset": {
            border: "1px solid #3F8CFF",
          },
        },

        "& .MuiFormLabel-root": {
          color: "#0a1629",
          "&.Mui-focused": {
            color: "#0a1629",
          },
          "&.Mui-disabled": {
            color: "#CED5E0",
          },
        },
      }}
      {...props}
    />
  );
};

export { AppInput };

"use client";
import styles from "./styles.module.css";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { TextField, Typography, Paper, Stack } from "@mui/material";
import { AppButton } from "@/components/UI/AppButton/AppButton";
import {
  InputNameTypes,
  TextFieldsValidaror,
} from "@/components/Helpers/TextFieldsValidaror/TextFieldsValidaror";

type ContactUsTypes = {
  name: string;
  phone: string;
  telegram: string;
  message: string;
};

const initialState = {
  name: "",
  phone: "",
  telegram: "",
  message: "",
};

const ContactUs = () => {
  const [state, setState] = useState<ContactUsTypes>(initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const onSendMessage = async (e: FormEvent<HTMLFormElement>) => {
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
        errorParagraph.classList.add(styles.errorMsg);

        i.parentElement?.parentElement?.append(errorParagraph);
        if (errorParagraph && errorMessage) {
          errorParagraph.innerText = errorMessage;
        }
      }
    });

    if (errors.length === 0) {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const result = await response.json();

      if (result.success) {
        alert("Повідомлення надіслано!");
        setState(initialState);
      } else {
        alert("Помилка при надсиланні повідомлення: " + result.error);
      }
    }
  };

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name) {
      setState((state) => ({ ...state, [name]: value }));
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        // maxWidth: 600,
        margin: "auto",
        mt: 6,
        p: 4,
        borderRadius: "16px",
        backgroundColor: "#f4f8ff",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
      }}
      component={"form"}
      onSubmit={onSendMessage}
      ref={formRef}
    >
      <Typography
        variant="h5"
        sx={{
          color: "var(--blue)",
          mb: 3,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Хочеш почати — заповнюй. Я зв’яжусь. Без відмазок.
      </Typography>

      <Stack spacing={2}>
        <TextField
          onChange={onHandleChange}
          label="Ім'я та прізвище"
          placeholder="Володимир Зеленський"
          variant="outlined"
          name="name"
          value={state.name}
          fullWidth
          sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
        />
        <TextField
          onChange={onHandleChange}
          label="Номер телефону"
          placeholder="0991234567"
          variant="outlined"
          name="phone"
          value={state.phone}
          fullWidth
          sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
        />
        <TextField
          onChange={onHandleChange}
          label="Telegram (@username)"
          placeholder="@username"
          variant="outlined"
          name="telegram"
          value={state.telegram}
          fullWidth
          sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
        />
        <TextField
          onChange={onHandleChange}
          label="Повідомлення"
          variant="outlined"
          name="message"
          value={state.message}
          multiline
          rows={4}
          fullWidth
          sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
        />
        <AppButton type="submit">Надіслати</AppButton>
      </Stack>
    </Paper>
  );
};

export default ContactUs;

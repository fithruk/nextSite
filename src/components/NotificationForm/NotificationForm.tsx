import { TextField, Typography } from "@mui/material";
import { AppButton } from "../UI/AppButton/AppButton";
import { ChangeEvent, FormEvent } from "react";

type NitificationFormTypes = {
  onSubmitNotification: (e: FormEvent<HTMLFormElement>) => void;
  onNotificationChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  notMessage: { title: string; message: string };
  selectedClients: string[];
};

const NotificationForm = ({
  onSubmitNotification,
  onNotificationChange,
  notMessage,
  selectedClients,
}: NitificationFormTypes) => {
  const clientName = selectedClients[selectedClients.length - 1]; // Костыль
  console.log(clientName);

  return (
    <form onSubmit={onSubmitNotification}>
      <Typography variant="h5">
        {clientName && `Створити сповіщення для ${clientName}`}
      </Typography>
      <TextField
        label="Заголовок"
        name="title"
        value={notMessage.title}
        variant="outlined"
        fullWidth
        sx={{ marginTop: { xs: "1vh", md: "1rem" } }}
        onChange={onNotificationChange}
      />
      <TextField
        fullWidth
        name="message"
        value={notMessage.message}
        label="Повідомлення"
        variant="outlined"
        multiline
        rows={5}
        sx={{ marginTop: { xs: "1vh", md: "1rem" } }}
        onChange={onNotificationChange}
      />
      <AppButton
        fullWidth
        type="submit"
        disabled={Object.values(notMessage).some((value) => !value)}
      >
        Вiдправити
      </AppButton>
    </form>
  );
};

export default NotificationForm;

import { Grid, TextField, Typography } from "@mui/material";
import { AppButton } from "../UI/AppButton/AppButton";
import { ChangeEvent, FormEvent } from "react";
import { ClientTypes } from "../../Types/types";
import NotificationFormHeader from "./NotificationFormHeader";

type NitificationFormTypes = {
  onSubmitNotification: (e: FormEvent<HTMLFormElement>) => void;
  onNotificationChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectClientForSendNotification: (clientName: string) => void;
  notMessage: { title: string; message: string };
  selectedClients: string[];
  allSiteClients: ClientTypes[];
};

const NotificationForm = ({
  onSubmitNotification,
  onNotificationChange,
  notMessage,
  selectedClients,
  allSiteClients,
  onSelectClientForSendNotification,
}: NitificationFormTypes) => {
  return (
    <form onSubmit={onSubmitNotification}>
      <Typography variant="h5">
        {selectedClients.length > 0 && `Створити сповіщення для: `}
      </Typography>
      <Grid container>
        {selectedClients.map((cl) => (
          <Grid
            component={"div"}
            onClick={() => {
              onSelectClientForSendNotification(cl);
            }}
            sx={{
              cursor: "pointer",
              margin: { xs: "0.5vh", md: "0.5rem" },
              backgroundColor: "var(--blue)",
              color: "var(--background-primary)",
              padding: { xs: "0.5vh", md: "0.5rem" },
              borderRadius: "var(--border-radius-secondary)",
            }}
            key={cl}
          >
            {cl}
          </Grid>
        ))}
      </Grid>
      <NotificationFormHeader
        allSiteClients={allSiteClients}
        onSelectClientForSendNotification={onSelectClientForSendNotification}
        selectedClients={selectedClients}
      />
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

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { AppButton } from "../UI/AppButton/AppButton";
import { ChangeEvent, FormEvent } from "react";
import { AbonDataTypes, ClientTypes } from "../../Types/types";
import NotificationFormHeader from "./NotificationFormHeader";
import { TemplateNotificationEnum } from "@/app/dashboard/admin/socketPage/page";

type NitificationFormTypes = {
  onSubmitNotification: (e: FormEvent<HTMLFormElement>) => void;
  onNotificationChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectClientForSendNotification: (clientName: string) => void;
  notMessage: { title: string; message: string };
  selectedClients: string[];
  allSiteClients: ClientTypes[];
  allAbonements: AbonDataTypes[];
  notifTemplateState: keyof typeof TemplateNotificationEnum;
  onHandleSelectNotifTemplate: (
    e: SelectChangeEvent<keyof typeof TemplateNotificationEnum>
  ) => void;
};

const NotificationForm = ({
  onSubmitNotification,
  onNotificationChange,
  notMessage,
  selectedClients,
  allSiteClients,
  allAbonements,
  onSelectClientForSendNotification,
  onHandleSelectNotifTemplate,
  notifTemplateState,
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
        allAbonements={allAbonements}
      />

      <Typography
        color="info"
        variant="h5"
        margin={{ xs: "1vh 0 0.5vh 0", md: "1rem 0 0.5vh 0" }}
      >
        Надіслати шаблон сповіщення
      </Typography>
      <FormControl
        fullWidth
        sx={{ margin: { xs: "1vh 0 0.5vh 0", md: "1rem 0 0.5vh 0" } }}
      >
        <InputLabel id="notificationSelectLabel">
          Шаблон повідомлення
        </InputLabel>
        <Select
          labelId="notificationSelectLabel"
          id="notificationSelect"
          value={notifTemplateState}
          label="notificationSelect"
          onChange={onHandleSelectNotifTemplate}
        >
          {(
            Object.keys(
              TemplateNotificationEnum
            ) as (keyof typeof TemplateNotificationEnum)[]
          ).map((key) => (
            <MenuItem key={key} value={key}>
              {TemplateNotificationEnum[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        color="info"
        variant="h5"
        margin={{ xs: "1vh 0 0.5vh 0", md: "1rem 0 0.5vh 0" }}
      >
        Створити власне сповіщення
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

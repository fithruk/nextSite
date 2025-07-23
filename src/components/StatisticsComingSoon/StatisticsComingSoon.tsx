import { Typography } from "@mui/material";
import { AppBox } from "../UI/AppBox/AppBox";
import image from "../../../public/images/logo/underConstruction.png";

const StatisticsComingSoon = () => {
  return (
    <AppBox>
      <img
        src={image.src}
        alt="Відсутня статистика"
        width={300}
        height={300}
        style={{ marginBottom: "1.5rem", opacity: 0.7 }}
      />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Розділ статистики в розробці
      </Typography>

      <Typography variant="body1" color="text.secondary" maxWidth={500}>
        Наразі тут ще немає достатньо даних, щоб відобразити повну аналітику.
        Тренуйся, заповнюй тренування — і статистика з’явиться автоматично.
      </Typography>
    </AppBox>
  );
};

export default StatisticsComingSoon;

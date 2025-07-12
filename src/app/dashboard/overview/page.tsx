import { Grid, Typography } from "@mui/material";
import image from "../../../../public/images/logo/underConstruction.png";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import { AppButton } from "@/components/UI/AppButton/AppButton";
const Overview = () => {
  return (
    <>
      <Grid
        size={{ xs: 12, md: 8 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "60vh",
          textAlign: "center",
          px: 2,
        }}
      >
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
            Наразі тут ще немає достатньо даних, щоб відобразити повну
            аналітику. Тренуйся, заповнюй тренування — і статистика з’явиться
            автоматично.
          </Typography>
        </AppBox>
      </Grid>
    </>
  );
};

export default Overview;

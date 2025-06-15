import RegisterStepVisualization from "@/components/RegisterStepVisualization/RegisterStepVisualization";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import { Grid } from "@mui/material";
import { RegistrationProvider } from "../Contexts/RegisterContext/RegisterContext";

const RegistrationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RegistrationProvider>
      <AppBox
        sx={{
          height: "100vh",
          backgroundColor: "#F4F9FD",
          "@media (max-width:900px)": {
            display: "flex",
          },
        }}
      >
        <Grid container spacing={{ xs: 2, md: 4 }} flexGrow={1} margin="5rem">
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              "@media (max-width:900px)": {
                fontSize: "2vh",
              },
            }}
          >
            <RegisterStepVisualization />
          </Grid>
          <Grid
            display={"flex"}
            size={{ xs: 12, md: 8 }}
            sx={{
              "@media (max-width:900px)": {
                flexGrow: 1,
              },
            }}
          >
            {children}
          </Grid>
        </Grid>
      </AppBox>
    </RegistrationProvider>
  );
};

export default RegistrationLayout;

import { Grid } from "@mui/material";
import { ReactNode } from "react";
import Navigation from "@/components/Navigation/Navigation";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      container
      sx={{ backgroundColor: "#B0D4FF", minHeight: "100vh", minWidth: "100vw" }}
      padding={{ xs: "1vh", sm: "1vh", md: "1rem" }}
      flexWrap={"wrap"}
      spacing={{ xs: 2, md: 6 }}
    >
      <Grid size={{ md: 2 }}>
        <Navigation />
      </Grid>
      <Grid size={{ xs: 12, md: 10 }}>{children}</Grid>
    </Grid>
  );
};

export default DashboardLayout;

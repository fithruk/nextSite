import LandingHeader from "@/components/Landing/Header/Header";
import { Paper } from "@mui/material";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import Services from "@/components/Landing/Services/Services";
import Accordions from "@/components/Landing/FAQ/Accordions";

export default function Landing() {
  return (
    <Paper
      sx={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: { xs: "0.5rem", md: "2rem" },
      }}
    >
      <AppBox minHeight={"100vh"} borderColor={"#B0D4FF"}>
        {" "}
        <LandingHeader />
        <Services />
        <Accordions />
      </AppBox>
    </Paper>
  );
}

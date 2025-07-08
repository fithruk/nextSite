"use client";

import LandingHeader from "@/components/Landing/Header/Header";
import { useRef, useState } from "react";
import { Paper } from "@mui/material";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import Services from "@/components/Landing/Services/Services";
import Accordions from "@/components/Landing/FAQ/Accordions";
import ContactUs from "@/components/Landing/ContactUs/ContactUs";
import OurPlans from "@/components/OurPlans/OurPlans";

export default function Landing() {
  const contactUsRef = useRef<HTMLDivElement | null>(null);
  const [messageFromPlan, setMessageFromPlan] = useState<string>("");

  const scrollToContact = (msg: string) => {
    setMessageFromPlan(msg);

    contactUsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
        <OurPlans scrollToContact={scrollToContact} />
        <Accordions />
        <ContactUs ref={contactUsRef} prefillMessage={messageFromPlan} />
      </AppBox>
    </Paper>
  );
}

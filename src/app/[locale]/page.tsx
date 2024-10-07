"use client";
import { useRef } from "react";
import { Container } from "@/components/CommonComponents/Container/Container";
import styles from "../page.module.css";
import { Header } from "@/components/Header/Header";
import { Section } from "@/components/CommonComponents/Section/Section";
import { Benefits } from "@/components/Benefits/Benefits";
import { LotOfExpirience } from "@/components/LotOfExpirience/LotOfExpirience";
import { Slider } from "@/components/Slider/Slider";
import { FormSection } from "@/components/FormSection/FormSection";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

export default function Home() {
  const t = useTranslations("WhyChooseUs");
  const s = useTranslations("Slider");
  const session = useSession();
  console.log(session);

  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const contactsRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div className={styles.page}>
        <Container>
          <Header
            refs={[homeRef, aboutRef, sliderRef, contactsRef]}
            ref={homeRef}
          />
          <main>
            <Section
              titleFirst={t("whyChooseUs1")}
              titkleLast={t("whyChooseUs2")}
              subTitle={t("subTitle")}
            >
              <Benefits />
            </Section>
            <LotOfExpirience ref={aboutRef} />
            <Section
              titleFirst={s("title1")}
              titkleLast={s("title2")}
              subTitle={s("subTitle")}
            >
              <Slider ref={sliderRef} />
            </Section>
            <FormSection ref={contactsRef} />
          </main>
        </Container>
      </div>
    </>
  );
}

import formSectionStyles from "./formSection.module.css";
import { Section } from "../CommonComponents/Section/Section";
import sectionStyles from "../CommonComponents/Section/section.module.css";
import { Container } from "../CommonComponents/Container/Container";
import { Form } from "../Form/Form";
import Image from "next/image";
import flexedMan from "../../assets/images/flexedMan.png";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";

export const FormSection = forwardRef<HTMLDivElement>((_, ref) => {
  const t = useTranslations("Form");
  return (
    <Container type="inner">
      <div ref={ref} className={`${formSectionStyles.innerWrapper}`}>
        <div className={`${formSectionStyles.formSection}`}>
          <div className={`${formSectionStyles.part}`}>
            <Image
              className={`${formSectionStyles.image}`}
              src={flexedMan}
              alt="flexing man"
            />
          </div>
          <div className={`${formSectionStyles.part}`}>
            <Section
              titleFirst={t("title1")}
              titkleLast={t("title2")}
              subTitle={t("subTitle")}
              classNames={sectionStyles.backColorBlack}
            >
              <Form />
            </Section>
          </div>
        </div>
      </div>
    </Container>
  );
});

FormSection.displayName = "FormSection";

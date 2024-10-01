import Image from "next/image";
import { forwardRef } from "react";
import imgMan from "../../assets/images/ex_man.png";
import imgBack from "../../assets/images/ex_back.png";
import { Typography } from "../CommonComponents/Typography/Typography";
import { Container } from "../CommonComponents/Container/Container";
import { AppButton } from "../CommonComponents/Button/Button";
import typographyStyles from "../CommonComponents/Typography/typography.module.css";
import lotOfExpirienceStyles from "./lotOfExpirience.module.css";
import { useTranslations } from "next-intl";
//type Props = {};

export const LotOfExpirience = forwardRef<HTMLDivElement>((_, ref) => {
  const t = useTranslations("LotOfExpirince");
  const b = useTranslations("ButtonText");

  return (
    <Container type="inner">
      <div ref={ref} className={lotOfExpirienceStyles.lotOfExpirience}>
        <div className={lotOfExpirienceStyles.content}>
          <Typography classnames={`${typographyStyles.h2}`} type="h2">
            <Typography
              classnames={`${typographyStyles.colorPrimary}`}
              type="span"
            >
              {t("lotOfExpirinceTitle1").toUpperCase()}
            </Typography>
          </Typography>
          <Typography
            classnames={`${typographyStyles.colorSecondary} ${typographyStyles.h2}`}
            type="span"
          >
            {t("lotOfExpirinceTitle2").toUpperCase()}
          </Typography>
          <Typography
            classnames={`${typographyStyles.colorPrimary} ${typographyStyles.basicFontSize}`}
            type="p"
          >
            {t("lotOfExpirinceP1")}
          </Typography>
          <Typography
            classnames={`${typographyStyles.colorPrimary} ${typographyStyles.basicFontSize}`}
            type="p"
          >
            {t("lotOfExpirinceP2")}
          </Typography>
          <AppButton variant="secondary" type="button">
            {b("aboutUs")}
          </AppButton>
        </div>
        <div className={lotOfExpirienceStyles.img}>
          <div className={lotOfExpirienceStyles.imgBox}>
            <Image
              className={lotOfExpirienceStyles.pullingMan}
              src={imgMan}
              alt="Подтягивающийся мужик"
            />
          </div>
        </div>
        <Image
          className={lotOfExpirienceStyles.back}
          src={imgBack}
          alt="фоновое изображение спортзала"
        />
      </div>
    </Container>
  );
});

LotOfExpirience.displayName = "LotOfExpirience";

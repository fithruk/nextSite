import { useTranslations } from "next-intl";
import { Container } from "../../CommonComponents/Container/Container";
import { Typography } from "../../CommonComponents/Typography/Typography";
import { AppButton } from "../../CommonComponents/Button/Button";
import HeaderStat from "../HeaderStat/HeaderStat";
import typographyStyles from "../../CommonComponents/Typography/typography.module.css";
import headerContendStyles from "./headerContent.module.css";
import containerStyles from "../../CommonComponents/Container/container.module.css";

//type Props = {};

export const HeaderContent = () => {
  const t = useTranslations("Header");
  const b = useTranslations("ButtonText");
  return (
    <Container type="inner" classnames={containerStyles.marginTop7Rem}>
      <div className={headerContendStyles.container}>
        <div>
          <Typography classnames={`${typographyStyles.h1}`} type="h1">
            {t("readyToTrain").toUpperCase()}
          </Typography>
          <Typography
            classnames={`${typographyStyles.colorSecondary} ${typographyStyles.h1}`}
            type="span"
          >
            {t("yourBody").toUpperCase()}
          </Typography>
          <Typography
            type="p"
            classnames={`${typographyStyles.subHeaderSubTitle} ${typographyStyles.basicFontSize}`}
          >
            {t("subTitle")}
          </Typography>
          <AppButton type="button" variant="primary">
            {b("lestJoinNow")}
          </AppButton>
          <HeaderStat />
        </div>
      </div>
    </Container>
  );
};

import { Typography } from "@/components/CommonComponents/Typography/Typography";
import typographyStyles from "../../CommonComponents/Typography/typography.module.css";
import headerStatStyles from "./headerStat.module.css";
import { useTranslations } from "next-intl";

const stat: StatProps[] = [
  { statTitle: "yearsofExperience", statValue: 7 },
  { statTitle: "membersJoin", statValue: 50 },
  { statTitle: "happyMembers", statValue: 47 },
];

type StatProps = {
  statTitle: string;
  statValue: number;
};

const HeaderStat = () => {
  const t = useTranslations("Header");
  return (
    <ul className={headerStatStyles.headerStat}>
      {stat.map((key, i) => {
        return (
          <li key={i}>
            <Typography
              type="p"
              classnames={`${typographyStyles.fontSize3Rem} ${typographyStyles.colorSecondary}`}
            >
              {key.statValue}+
            </Typography>
            <Typography
              type="p"
              classnames={`${typographyStyles.basicFontSize} ${typographyStyles.colorPrymary}`}
            >
              {t(key.statTitle)}
            </Typography>
          </li>
        );
      })}
    </ul>
  );
};

export default HeaderStat;

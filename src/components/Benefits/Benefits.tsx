import { useTranslations } from "next-intl";
import { Typography } from "../CommonComponents/Typography/Typography";
import typographyStyles from "../CommonComponents/Typography/typography.module.css";
import benefitsStyles from "./benefits.module.css";
//type Props = {};

type BenefitsProps = {
  index: number;
  title: string;
  value: string;
};

const benefitsArray: BenefitsProps[] = [
  {
    index: 1,
    title: "personalTrainingTitle",
    value: "personalTrainingValue",
  },
  {
    index: 2,
    title: "equipmentAndFacilitiesTitle",
    value: "equipmentAndFacilitiesValue",
  },
  {
    index: 3,
    title: "nutritionCounselingTitle",
    value: "nutritionCounselingValue",
  },
  {
    index: 4,
    title: "specialityProgramsTitle",
    value: "specialityProgramsValue",
  },
];
export const Benefits = () => {
  const t = useTranslations("WhyChooseUs");
  return (
    <div className={`${benefitsStyles.benefits}`}>
      {benefitsArray.map((key) => {
        return (
          <div key={key.index} className={benefitsStyles.cell}>
            <Typography
              classnames={`${typographyStyles.colorPrymary} ${typographyStyles.fontSize2Rem}`}
              type="p"
            >
              0{key.index}
            </Typography>
            <Typography
              classnames={`${typographyStyles.colorSecondary} ${typographyStyles.fontSize2Rem}`}
              type="p"
            >
              {t(key.title)}
            </Typography>
            <Typography
              classnames={`${typographyStyles.basicFontSize}`}
              type="p"
            >
              {t(key.value)}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

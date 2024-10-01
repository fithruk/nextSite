import { Container } from "../Container/Container";
import { Typography } from "../Typography/Typography";
import typographyStyles from "../Typography/typography.module.css";
import sectionStyles from "./section.module.css";
type Props = {
  children?: React.ReactNode;
  classNames?: string;
  titleFirst: string;
  titkleLast: string;
  subTitle: string;
};

export const Section = ({
  children,
  titleFirst,
  titkleLast,
  subTitle,
  classNames,
}: Props) => {
  const combinedClassNames = classNames
    ? `${sectionStyles.section} ${classNames}`
    : sectionStyles.section;
  return (
    <section className={combinedClassNames}>
      <Container type="inner">
        <Typography
          classnames={`${typographyStyles.colorPrymary} ${typographyStyles.h2}`}
          type="h2"
        >
          {titleFirst.toUpperCase()}{" "}
          <Typography
            classnames={`${typographyStyles.colorSecondary}`}
            type="span"
          >
            <br />
            {titkleLast.toUpperCase()}
          </Typography>
        </Typography>
        <Typography
          classnames={`${typographyStyles.colorPrymary} ${typographyStyles.basicFontSize}`}
          type="p"
        >
          {subTitle}
        </Typography>
        {children}
      </Container>
    </section>
  );
};

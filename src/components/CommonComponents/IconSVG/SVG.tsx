import { FunctionComponent, SVGProps } from "react";
import svgStyles from "./svg.module.css";

type SVGIconType = {
  SVG: FunctionComponent<SVGProps<SVGSVGElement>>;
};

const SVGIcon = ({ SVG }: SVGIconType) => {
  return <SVG className={svgStyles.svg} />;
};

export default SVGIcon;

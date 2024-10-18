import Image, { StaticImageData } from "next/image";
import { Typography } from "../Typography/Typography";
import bannerStyles from "./banner.module.css";

type BannerProps = {
  img: StaticImageData;
  classNames?: string;
  type: "main" | "sub";
};

const Banner = ({ img, classNames, type }: BannerProps) => {
  const commonClassNames = classNames
    ? `${bannerStyles.subBanner} ${classNames}`
    : bannerStyles.subBanner;
  switch (type) {
    case "main":
      return (
        <div className={bannerStyles.mainBanner}>
          <div className={bannerStyles.content}>
            <Typography type="h2">Track Your Daily Activities</Typography>
            <Typography type="p">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod{" "}
            </Typography>
          </div>
          <div className={bannerStyles.imgContainer}>
            <Image className={bannerStyles.bannerImg} src={img} alt="banner" />
          </div>
        </div>
      );
    case "sub":
      return (
        <div className={commonClassNames}>
          <div className={bannerStyles.subContent}>
            <div className={bannerStyles.subImgContainer}>
              <Image className={bannerStyles.subImg} src={img} alt="banner" />
            </div>
            <div>
              <Typography type="p">Test paragrahp</Typography>
              <Typography type="p">Test paragrahp</Typography>
            </div>
          </div>
        </div>
      );

    default:
      break;
  }
};

export default Banner;

import overviewStyles from "./overview.module.css";

import Banner from "@/components/CommonComponents/Bunner/Banner";
import mainBannerImg from "../../../assets/images/banner_board_back_img.png";
import testIcon from "../../../assets/images/testImg.png";
import bannerStyles from "../../CommonComponents/Bunner/banner.module.css";

const Overview = () => {
  return (
    <div className={overviewStyles.container}>
      <div className={overviewStyles.mainBanner}>
        <Banner type="main" img={mainBannerImg} />
      </div>
      <div className={overviewStyles.subBunner}>
        <Banner
          type="sub"
          img={testIcon}
          classNames={bannerStyles.subBunnerBlue}
        />
        <Banner
          type="sub"
          img={testIcon}
          classNames={bannerStyles.subBunnerOrange}
        />
        <Banner
          type="sub"
          img={testIcon}
          classNames={bannerStyles.subBunnerPurple}
        />
      </div>
      <div className={overviewStyles.statistics}>statistics</div>
      <div className={overviewStyles.foodTable}>foodTable</div>
    </div>
  );
};

export default Overview;

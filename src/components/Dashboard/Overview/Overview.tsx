import overviewStyles from "./overview.module.css";

import Banner from "@/components/CommonComponents/Bunner/Banner";
import mainBannerImg from "../../../assets/images/banner_board_back_img.png";
import testIcon from "../../../assets/images/testImg.png";
import bannerStyles from "../../CommonComponents/Bunner/banner.module.css";
import { drawLine } from "@/components/CommonComponents/Bunner/Banner";
import Statistics from "@/components/CommonComponents/Statistics/Statistics";
import FoodTable from "../FoodTable/FoodTable";

const lineColor1 = "#064D5F";
const fillColor1 = "#0891B2";
const lineColor2 = "#E5580C";
const fillColor2 = "#FE6221";
const lineColor3 = "#9B30F0";
const fillColor3 = "#5B21B6";

const data = [
  { letter: "A", frequency: 8167 },
  { letter: "B", frequency: 1492 },
  { letter: "C", frequency: 2782 },
  { letter: "D", frequency: 4253 },
  { letter: "E", frequency: 12702 },
  { letter: "F", frequency: 2288 },
  { letter: "G", frequency: 2015 },
  // { letter: "H", frequency: 6094 },
  // { letter: "I", frequency: 6966 },
  // { letter: "J", frequency: 153 },
  // { letter: "K", frequency: 772 },
  // { letter: "L", frequency: 4025 },
  // { letter: "M", frequency: 2406 },
  // { letter: "N", frequency: 6749 },
  // { letter: "O", frequency: 7507 },
  // { letter: "P", frequency: 1929 },
  // { letter: "Q", frequency: 95 },
  // { letter: "R", frequency: 5987 },
  // { letter: "S", frequency: 6327 },
  // { letter: "T", frequency: 9056 },
  // { letter: "U", frequency: 2758 },
  // { letter: "V", frequency: 978 },
  // { letter: "W", frequency: 236 },
  // { letter: "X", frequency: 15 },
  // { letter: "Y", frequency: 1974 },
  // { letter: "Z", frequency: 74 },
];

const overviewTitle = "Track Your Daily Activities";
const overviewParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod";

const Overview = () => {
  return (
    <div className={overviewStyles.container}>
      <div className={overviewStyles.mainBanner}>
        <Banner
          type="main"
          img={mainBannerImg}
          bannerHeader={overviewTitle}
          bannerParagraph={overviewParagraph}
        />
      </div>
      <div className={overviewStyles.subBunner}>
        <Banner
          type="sub"
          img={testIcon}
          classNames={bannerStyles.subBunnerBlue}
          drawLine={drawLine}
          lineColor={lineColor1}
          fillColor={fillColor1}
          subParagraph1="overviewParagraph"
          subParagraph2="overviewParagraph2"
        />
        <Banner
          type="sub"
          img={testIcon}
          classNames={bannerStyles.subBunnerOrange}
          drawLine={drawLine}
          lineColor={lineColor2}
          fillColor={fillColor2}
          subParagraph1="overviewParagraph"
          subParagraph2="overviewParagraph2"
        />
        <Banner
          type="sub"
          img={testIcon}
          classNames={bannerStyles.subBunnerPurple}
          drawLine={drawLine}
          lineColor={lineColor3}
          fillColor={fillColor3}
          subParagraph1="overviewParagraph"
          subParagraph2="overviewParagraph2"
        />
      </div>
      <div className={overviewStyles.statistics}>
        <Statistics data={data} />
      </div>
      <div className={overviewStyles.foodTable}>
        <FoodTable />
      </div>
    </div>
  );
};

export default Overview;

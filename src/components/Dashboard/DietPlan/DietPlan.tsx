import dietPlanStyles from "./dietPlan.module.css";
import FoodTable from "../FoodTable/FoodTable";
import bunnerImg from "../../../assets/images/banner_food_table.png";
import Banner from "@/components/CommonComponents/Bunner/Banner";

const dietPlanHeader = "Plan Your Diet Plan This Week";
const dietPlanParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ";
const DietPlan = () => {
  return (
    <div className={dietPlanStyles.container}>
      <div className={dietPlanStyles.mainBanner}>
        <Banner
          type="main"
          img={bunnerImg}
          bannerHeader={dietPlanHeader}
          bannerParagraph={dietPlanParagraph}
        />
      </div>
      <div className={dietPlanStyles.foodTable}>
        <FoodTable />
      </div>
    </div>
  );
};

export default DietPlan;

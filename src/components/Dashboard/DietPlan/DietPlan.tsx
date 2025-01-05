"use client";
import { useState, useEffect, useRef, MouseEvent } from "react";
import dietPlanStyles from "./dietPlan.module.css";
import FoodTable from "../FoodTable/FoodTable";
import bunnerImg from "../../../assets/images/banner_food_table.png";
import Banner from "@/components/CommonComponents/Bunner/Banner";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import FoodGenerator from "../FoodGenerator/FoodGenerator";

const dietPlanHeader = "Plan Your Diet Plan This Week";
const dietPlanParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ";

enum ComponentsEnum {
  foodTable = "foodTable",
  foodGenerator = "foodGenerator",
}

type VisibleComponentType =
  | ComponentsEnum.foodGenerator
  | ComponentsEnum.foodTable;

const DietPlan = () => {
  const [visibleComponent, setVisibleComponent] =
    useState<VisibleComponentType>(ComponentsEnum.foodTable);

  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
    const dataset = (e.target as HTMLButtonElement).dataset;
    if (dataset) {
      setVisibleComponent(dataset.key as VisibleComponentType);
    }
  };

  useEffect(() => {
    if (buttonsRef.current) {
      const buttons = Array.from(buttonsRef.current.children);
      const activeBtn = buttons.findIndex(
        (btn) => (btn as HTMLButtonElement).dataset.key == visibleComponent
      );

      buttons.forEach((btn) => btn.classList.remove(dietPlanStyles.active));
      buttons[activeBtn].classList.add(dietPlanStyles.active);
    }
  }, [visibleComponent]);

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
        <div className={dietPlanStyles.componentSwitcher} ref={buttonsRef}>
          <AppButton
            type="button"
            variant="secondary"
            onClick={handleClickButton}
            data-key={ComponentsEnum.foodTable}
          >
            Food Recipes
          </AppButton>{" "}
          <AppButton
            type="button"
            variant="secondary"
            onClick={handleClickButton}
            data-key={ComponentsEnum.foodGenerator}
          >
            Food Generator
          </AppButton>
        </div>
        {visibleComponent === ComponentsEnum.foodTable && <FoodTable />}
        {visibleComponent === ComponentsEnum.foodGenerator && <FoodGenerator />}
      </div>
    </div>
  );
};

export default DietPlan;

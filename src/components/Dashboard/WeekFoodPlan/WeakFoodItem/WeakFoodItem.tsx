"use client";
import WFitemStyles from "./WeakFoodItem.module.css";
import { MouseEvent, useState } from "react";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import FoodLIstItem from "../FoodListItem/FoodListItem";
import foodImage from "../../../../assets/images/banner_food_table.png";

type WeekFoodItemProps = {
  day: string;
};

const testMenu = {
  img: foodImage,
  title: "Food very delicios",
  calories: 500,
  time: "30 min",
};

const WeekFoodItem = ({ day }: WeekFoodItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    console.log(e.currentTarget);
    setIsOpen((isOpen) => (isOpen = !isOpen));
  };

  return (
    <li className={WFitemStyles.weekFoodItem} onClick={handleClick}>
      <div className={WFitemStyles.header}>
        <Typography type="span">{day}</Typography>
        <Typography type="span">{new Date().toLocaleDateString()}</Typography>
      </div>
      {isOpen && (
        <div className={WFitemStyles.container}>
          <ul className={WFitemStyles.foodList}>
            <FoodLIstItem {...testMenu} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default WeekFoodItem;

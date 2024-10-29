"use client";
import foodTableStyles from "./foodTable.module.css";
import meatIcon from "../../../assets/images/meatIcon.png";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { StaticImageData } from "next/image";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { FoodType, FoodTypeResponce } from "@/app/api/foodService/route";

const foodData = [
  {
    img: meatIcon,
    food: "Meat",
    meal: "Break Fast",
    calories: "receiving",
    priorities: "08:00 AM",
    carbs: 20,
  },
  {
    img: meatIcon,
    food: "Meat",
    meal: "Break Fast",
    calories: "receiving",
    priorities: "08:00 AM",
    carbs: 20,
  },
  {
    img: meatIcon,
    food: "Meat",
    meal: "Break Fast",
    calories: "receiving",
    priorities: "08:00 AM",
    carbs: 20,
  },
];

type FoodItemProps = {
  img: StaticImageData;
  food: string;
  meal: string;
  calories: string;
  priorities: string;
  carbs: number;
};

const FoodItem = ({
  img,
  food,
  meal,
  calories,
  priorities,
  carbs,
}: FoodItemProps) => {
  return (
    <tr className={foodTableStyles.tableRow}>
      <td>
        {" "}
        <div className={foodTableStyles.firstTdContent}>
          <div className={foodTableStyles.foodImageContainer}>
            {" "}
            <Image
              src={img}
              alt={food}
              className={foodTableStyles.foodImage}
            />{" "}
          </div>
          {food}
        </div>
      </td>
      <td>{meal}</td>
      <td>{calories}</td>
      <td>{priorities}</td>
      <td>{carbs}</td>
    </tr>
  );
};

const FoodTable = () => {
  const [foodDatas, setFoodData] = useState<FoodType[]>([]);

  const { data: session } = useSession();
  useEffect(() => {
    (async () => {
      if (session?.user.token) {
        const { data, status } = await axios.get<FoodTypeResponce>(
          "/api/foodService",
          {
            params: {
              token: session?.user.token,
            },
          }
        );
        setFoodData(data);
        console.log(status);
      }
    })();
  }, []);

  return (
    <table className={foodTableStyles.table}>
      <thead className="main-table-list__header">
        <tr className="main-table-list__row">
          <th className="main-table-list__item">
            {" "}
            <Typography type="span">Food</Typography>
          </th>
          <th className="main-table-list__item">
            <Typography type="span">Meal</Typography>
          </th>
          <th className="main-table-list__item">
            <Typography type="span">Calories</Typography>
          </th>
          <th className="main-table-list__item">
            <Typography type="span">Priorities</Typography>
          </th>
          <th className="main-table-list__item">
            <Typography type="span">Carbs</Typography>
          </th>
        </tr>
      </thead>
      <tbody className={foodTableStyles.tableBody}>
        {foodData.map((foodItem, ind) => (
          <FoodItem {...foodItem} key={ind} />
        ))}
      </tbody>
    </table>
  );
};

export default FoodTable;

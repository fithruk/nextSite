"use client";
import foodTableStyles from "./foodTable.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSession } from "next-auth/react";
import Pagination from "@/components/CommonComponents/Pagination/Pagination";
import { FoodType, FoodTypeResponce } from "@/app/api/foodService/route";
import { usePagination } from "@/hooks/usePagination";
import { foodSortReducer, actionEnam } from "@/reducers/sortReducer";
import SortPannel from "@/components/CommonComponents/SortPannel/SortPannel";

type FoodItemProps = {
  img: string;
  food: string;
  meal: string;
  tableData?: {
    calories: string;
    proteins: string;
    carbs: string;
    fats: string;
    fiber: string | null | undefined;
  };
};

const FoodItem = ({ img, food, meal, tableData }: FoodItemProps) => {
  const title = food.trim().split(":")[1];
  if (!title) return;
  return (
    <tr className={foodTableStyles.tableRow}>
      <td>
        {" "}
        <div className={foodTableStyles.firstTdContent}>
          <div className={foodTableStyles.foodImageContainer}>
            {" "}
            <img
              src={img}
              alt={food}
              className={foodTableStyles.foodImage}
            />{" "}
          </div>
          {title}
        </div>
      </td>
      <td>{meal}</td>
      <td>
        {isNaN(Number(tableData?.calories))
          ? tableData?.calories
          : `${tableData?.calories} ккал`}
      </td>
      <td>{tableData?.carbs}</td>
      <td>{tableData?.fats}</td>
      <td>{tableData?.proteins}</td>
      <td>{tableData?.fiber}</td>
    </tr>
  );
};

const FoodTable = () => {
  const [foodData, setFoodData] = useState<FoodType[]>([]);
  const [state, dispatch] = useReducer(foodSortReducer, {
    foodData,
    filteredData: [],
  });
  const [totalPageCount, currentPage, indStart, indEnd, onOpageChange] =
    usePagination({
      data: state.filteredData,
      itemsPerPage: 20,
    });
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
        // Добавить редирект при статусе не 200
        setFoodData(data);
        console.log(status);
        dispatch({ type: actionEnam.setData, payload: data });
      }
    })();
  }, []);

  return (
    <>
      <SortPannel dispatch={dispatch} />
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
              <Typography type="span">Carbs</Typography>
            </th>
            <th className="main-table-list__item">
              <Typography type="span">fats</Typography>
            </th>
            <th className="main-table-list__item">
              <Typography type="span">proteins</Typography>
            </th>
            <th className="main-table-list__item">
              <Typography type="span">fiber</Typography>
            </th>
          </tr>
        </thead>
        <tbody className={foodTableStyles.tableBody}>
          {state.filteredData.slice(indStart, indEnd).map((foodItem, ind) => (
            <FoodItem
              img={foodItem.imgUrls[foodItem.imgUrls.length - 1]}
              food={foodItem.title}
              meal={foodItem.category}
              tableData={foodItem.tableData}
              key={ind}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        totalPageCount={totalPageCount as number}
        currentPage={currentPage as number}
        onPageChange={onOpageChange}
      />
    </>
  );
};

export default FoodTable;

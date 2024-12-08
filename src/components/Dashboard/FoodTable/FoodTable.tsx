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
import { AppButton } from "@/components/CommonComponents/Button/Button";
import Recipe from "@/components/CommonComponents/Recipe/Recipe";

type FoodItemProps = {
  img: string;
  food: string;
  meal: string;
  _id: string;
  tableData?: {
    calories: string;
    proteins: string;
    carbs: string;
    fats: string;
    fiber: string | null | undefined;
  };
  handleModal: (_id: string) => void;
};

const FoodItem = ({
  img,
  food,
  meal,
  tableData,
  _id,
  handleModal,
}: FoodItemProps) => {
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
      <div className={foodTableStyles.routePannel}>
        <AppButton
          type="button"
          variant="secondary"
          onClick={() => handleModal(_id)}
        >
          Go to recipe
        </AppButton>
        <AppButton type="button" variant="secondary">
          Add to your plan
        </AppButton>
      </div>
    </tr>
  );
};

type ModalProps = {
  isOpen: boolean;
  foodId: string | null;
};

const FoodTable = () => {
  const [foodData, setFoodData] = useState<FoodType[]>([]);
  const [state, dispatch] = useReducer(foodSortReducer, {
    foodData,
    filteredData: [],
  });
  const [modal, setIsModalOpen] = useState<ModalProps>({
    isOpen: false,
    foodId: null,
  });
  const [totalPageCount, currentPage, indStart, indEnd, onOpageChange] =
    usePagination({
      data: state.filteredData,
      itemsPerPage: 20,
    });
  const { data: session } = useSession();
  const handleModal = (_id: string | null) => {
    setIsModalOpen((state) => ({
      ...state,
      isOpen: !state.isOpen,
      foodId: _id,
    }));
  };
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
    <div className={foodTableStyles.container}>
      {modal.isOpen && modal.foodId && (
        <Recipe _id={modal.foodId} handleModal={() => handleModal(null)} />
      )}
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
              _id={foodItem._id}
              handleModal={handleModal}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        totalPageCount={totalPageCount as number}
        currentPage={currentPage as number}
        onPageChange={onOpageChange}
      />
    </div>
  );
};

export default FoodTable;

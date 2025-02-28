import { FoodType } from "@/types/types";

export enum mealOptions {
  mainDishes = "MAIN DISHES",
  lowCarbs = "LOW CARBS",
  vegans = "VEGANS",
  desserts = "DESSERTS",
  breakfasts = "BREAKFASTS", //"Breakfasts"
}

export enum sortValues {
  byCalories = "CALORIES",
  byCarbs = "CARBS",
  byProteins = "PROTEINS",
  byFats = "FATS",
  byMeal = "MEAL",
}

interface IState {
  foodData: FoodType[];
  filteredData: FoodType[];
}

export enum actionEnam {
  filterAction = "FILTER BY",
  sortAction = "SORT_BY",
  setData = "SET_DATA",
  resetData = "RESET_DATA",
}

export type foodSortReducerProps = {
  type:
    | actionEnam.filterAction
    | actionEnam.sortAction
    | actionEnam.setData
    | actionEnam.resetData;
  payload?: FoodType[] | mealOptions[] | sortValues[];
};

const foodSortReducer = (
  state: IState,
  action: foodSortReducerProps
): IState => {
  switch (action.type) {
    case actionEnam.setData:
      return {
        ...state,
        foodData: [...(action.payload as FoodType[])],
        filteredData: [...(action.payload as FoodType[])],
      };

    case actionEnam.filterAction:
      const newState = state.foodData.filter((rc) =>
        action.payload?.some(
          (category) => category === rc.category.toUpperCase()
        )
      );

      return { ...state, filteredData: newState };

    case actionEnam.sortAction:
      const sortedData = [...state.filteredData].sort((a, b) => {
        for (const sortParam of action.payload as sortValues[]) {
          let comparison = 0;

          switch (sortParam) {
            case sortValues.byCalories:
              comparison =
                parseInt(a.tableData.calories, 10) -
                parseInt(b.tableData.calories, 10);
              break;
            case sortValues.byProteins:
              comparison =
                parseInt(b.tableData.proteins, 10) -
                parseInt(a.tableData.proteins, 10);
              break;
            case sortValues.byCarbs:
              comparison =
                parseInt(a.tableData.carbs, 10) -
                parseInt(b.tableData.carbs, 10);
              break;
            case sortValues.byFats:
              comparison =
                parseInt(a.tableData.fats, 10) - parseInt(b.tableData.fats, 10);
              break;
            case sortValues.byMeal:
              comparison = a.title.localeCompare(b.title);
              break;
            default:
              break;
          }

          if (comparison !== 0) {
            return comparison;
          }
        }
        return 0;
      });

      return { ...state, filteredData: sortedData };

    case actionEnam.resetData:
      return { ...state, filteredData: [...state.foodData] };

    default:
      return state;
  }
};

export { foodSortReducer };

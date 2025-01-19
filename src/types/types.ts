export type NutrientsType = {
  name: string;
  grams: number;
  calories: number;
};

export type FoodTableStateType = Partial<
  Record<"fats" | "vegetables" | "proteins" | "carbohydrates", NutrientsType[]>
>;

export type FoodType = {
  title: string;
  paragraphs: string[];
  tableData: {
    calories: string;
    proteins: string;
    carbs: string;
    fats: string;
    fiber: string | null;
  };
  imgUrls: string[];
  category: string;
  ingredients: { [key: string]: string[] };
  _id: string;
};

export type FoodTypeResponce = [FoodType];

export type FoodPlanType = Partial<
  Record<
    "fats" | "vegetables" | "proteins" | "carbohydrates",
    | {
        name: string;
        grams: number;
        calories: number;
      }[]
    | undefined
  >
>;

export type SaveFoodRespType = {
  email?: string;
  token?: string;
  foodPlan: FoodPlanType;
};

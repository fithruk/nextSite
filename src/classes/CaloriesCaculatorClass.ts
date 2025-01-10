import {
  ActivityOptionsTypes,
  CaloriesCalculatorUserAsnswerType,
  FoodPriorityOptionsTypes,
} from "@/components/Dashboard/CaloriesCalculator/CaloriesCalculator";

import foodData from "../components/Dashboard/FoodGenerator/foodData.json";
import { UserAnswerType } from "@/hooks/useUserSurvey";

const activityMultipliers: Record<ActivityOptionsTypes, number> = {
  Basic: 1.2,
  "Minimum/not load": 1.375,
  "3 times per week": 1.55,
  "5 times per week": 1.725,
  "5 times per week with high intence": 1.9,
  "Every day": 2.0,
  "Every day and physical work": 2.3,
};

interface UserData {
  gender: "Male" | "Female";
  weight: number; // в килограммах
  height: number; // в сантиметрах
  age: number; // в годах
  activity: ActivityOptionsTypes;
  foodPriority: FoodPriorityOptionsTypes;
}

type NutrientsProportionsType = {
  carbohydrates: number;
  proteins: number;
  vegetables?: number;
  fats: number;
};

enum FoodPriorityEnum {
  growWeight = "Grow weight",
  lossWeight = "Loss weight",
  maintaneWeight = "Maintain weight",
}

class CaloriesCalculatorClass {
  public static CountMinimalCalories = (userData: UserData) => {
    const { gender, weight, height, age, activity, foodPriority } = userData;
    const bmr =
      gender === "Male"
        ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
        : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;

    const activityMultiplier = activityMultipliers[activity];
    let totalCalories = bmr * activityMultiplier;
    switch (foodPriority) {
      case "Grow weight":
        totalCalories = totalCalories + (totalCalories * 15) / 100;
        break;
      case "Loss weight":
        totalCalories = totalCalories - (totalCalories * 15) / 100;
      default:
        break;
    }

    return Math.round(totalCalories);
  };

  public static PrepareFoodPlan = (
    answersFromCalculator: CaloriesCalculatorUserAsnswerType,
    userFoodAnswers: UserAnswerType
  ) => {
    const totalCalories = this.CountMinimalCalories(answersFromCalculator);
    const { foodPriority } = answersFromCalculator;
    const nutritionProportions = this.GetNutritionProportions(foodPriority);
    const carbsProducts = this.getCarbsProducts(
      totalCalories,
      nutritionProportions!,
      userFoodAnswers
    );
  };

  private static GetNutritionProportions = (
    foodPriority: FoodPriorityOptionsTypes
  ) => {
    const growProportions: NutrientsProportionsType = {
      proteins: 25,
      fats: 25,
      carbohydrates: 50,
    };
    const lossProportions: NutrientsProportionsType = {
      proteins: 40,
      fats: 25,
      carbohydrates: 35,
    };

    switch (foodPriority) {
      case FoodPriorityEnum.growWeight:
        return growProportions;
      case FoodPriorityEnum.lossWeight:
        return lossProportions;
      case FoodPriorityEnum.maintaneWeight:
        return growProportions;

      default:
        break;
    }
  };

  private static getCarbsProducts = (
    totalCalories: number,
    proportions: NutrientsProportionsType,
    userFoodAnswers: UserAnswerType
  ) => {
    const carbs = foodData.carbohydrates;
    const carbsShare = proportions.carbohydrates;

    const caloriesShare = Math.floor((totalCalories * carbsShare) / 100);

    const preferredProductsData = carbs.filter((f) =>
      userFoodAnswers.carbohydrates.includes(f.name)
    );

    const everyProductCalShare = Math.floor(
      caloriesShare / preferredProductsData.length
    );

    const productQuantities = preferredProductsData.map((product) => {
      const carbsPerGram = product.carbs / product.calories; // Углеводы на 1 ккал
      const grams = Math.floor(everyProductCalShare / (carbsPerGram * 4)); // Граммы продукта
      return {
        name: product.name,
        grams,
        calories: everyProductCalShare,
      };
    });

    console.log(productQuantities);
  };
}

export { CaloriesCalculatorClass };

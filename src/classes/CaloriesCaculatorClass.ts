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
    const proteinProducts = this.getProteinProducts(
      totalCalories,
      nutritionProportions!,
      userFoodAnswers
    );

    const vegetableProducts = this.getVegetableProducts(
      totalCalories,
      nutritionProportions!,
      userFoodAnswers
    );

    const fatProducts = this.getFatProducts(
      totalCalories,
      nutritionProportions!,
      userFoodAnswers
    );
    console.log(carbsProducts);
    console.log(proteinProducts);
    console.log(vegetableProducts);
    console.log(fatProducts);
  };

  private static GetNutritionProportions = (
    foodPriority: FoodPriorityOptionsTypes
  ) => {
    const growProportions: NutrientsProportionsType = {
      proteins: 35,
      fats: 15,
      carbohydrates: 50,
      vegetables: 15,
    };
    const lossProportions: NutrientsProportionsType = {
      proteins: 45,
      fats: 20,
      carbohydrates: 35,
      vegetables: 20,
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
      const carbsPerGram = product.carbohydrates / 100; // Углеводы в граммах на 1 грамм продукта
      if (carbsPerGram === 0) {
        return { name: product.name, grams: 0, calories: 0 }; // Пропускаем продукты без углеводов
      }
      const grams = Math.floor(everyProductCalShare / (carbsPerGram * 4)); // Расчет граммов
      return {
        name: product.name,
        grams,
        calories: everyProductCalShare,
      };
    });

    return productQuantities;
  };

  private static getProteinProducts = (
    totalCalories: number,
    proportions: NutrientsProportionsType,
    userFoodAnswers: UserAnswerType
  ) => {
    const proteins = foodData.proteins;
    const proteinShare = proportions.proteins;

    const caloriesShare = Math.floor((totalCalories * proteinShare) / 100);

    const preferredProductsData = proteins.filter((f) =>
      userFoodAnswers.proteins.includes(f.name)
    );

    const everyProductCalShare = Math.floor(
      caloriesShare / preferredProductsData.length
    );

    const productQuantities = preferredProductsData.map((product) => {
      const proteinsPerGram = product.proteins / 100; // Белки в граммах на 1 грамм продукта
      if (proteinsPerGram === 0) {
        return { name: product.name, grams: 0, calories: 0 }; // Пропускаем продукты без белков
      }
      const grams = Math.floor(everyProductCalShare / (proteinsPerGram * 4)); // Расчет граммов
      return {
        name: product.name,
        grams,
        calories: everyProductCalShare,
      };
    });

    return productQuantities;
  };

  private static getVegetableProducts = (
    totalCalories: number,
    proportions: NutrientsProportionsType,
    userFoodAnswers: UserAnswerType
  ) => {
    const vegetables = foodData.vegetables;
    const vegetableShare = proportions.vegetables || 0; // Учитываем, что пропорция для овощей может быть необязательной

    const caloriesShare = Math.floor((totalCalories * vegetableShare) / 100);

    const preferredProductsData = vegetables.filter((f) =>
      userFoodAnswers.vegetables.includes(f.name)
    );

    const everyProductCalShare = Math.floor(
      caloriesShare / preferredProductsData.length
    );

    const productQuantities = preferredProductsData.map((product) => {
      const carbsPerGram = product.carbohydrates / 100; // Углеводы в овощах на 1 грамм продукта
      if (carbsPerGram === 0) {
        return { name: product.name, grams: 0, calories: 0 }; // Пропускаем продукты без углеводов
      }
      const grams = Math.floor(everyProductCalShare / (carbsPerGram * 4)); // Расчет граммов
      return {
        name: product.name,
        grams,
        calories: everyProductCalShare,
      };
    });

    return productQuantities;
  };

  private static getFatProducts = (
    totalCalories: number,
    proportions: NutrientsProportionsType,
    userFoodAnswers: UserAnswerType
  ) => {
    const fats = foodData.fats;
    const fatShare = proportions.fats;

    const caloriesShare = Math.floor((totalCalories * fatShare) / 100);

    const preferredProductsData = fats.filter((f) =>
      userFoodAnswers.fats.includes(f.name)
    );

    const everyProductCalShare = Math.floor(
      caloriesShare / preferredProductsData.length
    );

    const productQuantities = preferredProductsData.map((product) => {
      const fatsPerGram = product.fats / 100; // Жиры в граммах на 1 грамм продукта
      if (fatsPerGram === 0) {
        return { name: product.name, grams: 0, calories: 0 }; // Пропускаем продукты без жиров
      }
      const grams = Math.floor(everyProductCalShare / (fatsPerGram * 9)); // Расчет граммов (жиры = 9 ккал/г)
      return {
        name: product.name,
        grams,
        calories: everyProductCalShare,
      };
    });

    return productQuantities;
  };
}

export { CaloriesCalculatorClass };

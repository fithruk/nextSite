import {
  ActivityOptionsTypes,
  FoodPriorityOptionsTypes,
} from "@/components/Dashboard/CaloriesCalculator/CaloriesCalculator";

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
}

export { CaloriesCalculatorClass };

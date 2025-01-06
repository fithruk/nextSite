import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useUserSurvey } from "@/hooks/useUserSurvey";
import { CaloriesCalculatorUserAsnswerType } from "../CaloriesCalculator/CaloriesCalculator";
const FoodGenerator = () => {
  const { getItem } = useLocalStorage<CaloriesCalculatorUserAsnswerType>();
  const answers = getItem("userCaloriesCalculatorAnswers");
  console.log(answers);

  return <div>FoodGenerator</div>;
};

export default FoodGenerator;

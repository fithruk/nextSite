import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CaloriesCalculatorUserAsnswerType } from "../CaloriesCalculator/CaloriesCalculator";
const FoodGenerator = () => {
  const { getItem } = useLocalStorage<CaloriesCalculatorUserAsnswerType>();
  const answers = getItem("userCaloriesCalculatorAnswers");
  console.log(answers);

  return <div>FoodGenerator</div>;
};

export default FoodGenerator;

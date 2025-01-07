import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useUserSurvey } from "@/hooks/useUserSurvey";
import UserSurveyElement from "@/components/CommonComponents/UserSurveyElement/UserSurveyElement";
import { CaloriesCalculatorUserAsnswerType } from "../CaloriesCalculator/CaloriesCalculator";
import { FormEvent, useState } from "react";
import foodData from "./foodData.json";

const questions = Object.keys(foodData).map(
  (foodType) => `Choose products: ${foodType}`
);

const FoodGenerator = () => {
  const { getItem } = useLocalStorage<CaloriesCalculatorUserAsnswerType>();
  const answersFromCaloriesCalculator = getItem(
    "userCaloriesCalculatorAnswers"
  );
  const {
    getAllQuestions,
    getCurrentQuestion,
    getCurrentQuestionInd,
    saveUserAnswer,
    getUsersAnswers,
    nextQuestion,
    resetQuestion,
  } = useUserSurvey<string>(questions);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentOptions = Object.values(foodData);
  const currentOptionsLabels = currentOptions[getCurrentQuestionInd()].map(
    (food) => food.name
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Сохранять ответы пользователя в хуке
    console.log("Выбранные опции:", selectedOptions);
    nextQuestion();
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserSurveyElement
        questionTitle={getCurrentQuestion()!}
        questionOptions={currentOptionsLabels}
        selectedOptions={selectedOptions}
        onOptionChange={handleOptionChange}
      />
      <AppButton variant="secondary" type="submit">
        {getCurrentQuestion() ? "Next" : "Finish"}
      </AppButton>
    </form>
  );
};
export default FoodGenerator;

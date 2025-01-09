import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useUserSurvey } from "@/hooks/useUserSurvey";
import UserSurveyElement from "@/components/CommonComponents/UserSurveyElement/UserSurveyElement";
import { CaloriesCalculatorUserAsnswerType } from "../CaloriesCalculator/CaloriesCalculator";
import { FormEvent, useState, useEffect } from "react";
import foodData from "./foodData.json";

const userAnswersKeysArray = Object.keys(foodData);

const questions = userAnswersKeysArray.map(
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

  const [userAnswersKeysInd, setUserAnswersKeysInd] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentOptions = Object.values(foodData);
  const currentOptionsLabels = currentOptions[getCurrentQuestionInd()].map(
    (food) => food.name
  );

  const isSurveyInProgress: boolean = Boolean(
    userAnswersKeysArray[userAnswersKeysInd]
  );
  console.log(isSurveyInProgress + " isSurveyInProgress");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSurveyInProgress) {
      return console.log("Submit");
    }

    console.log("Выбранные опции:", selectedOptions);
    if (isSurveyInProgress) {
      saveUserAnswer(userAnswersKeysArray[userAnswersKeysInd], selectedOptions);
    }
    setSelectedOptions([]);
    nextQuestion();
    setUserAnswersKeysInd((prev) => (prev = prev + 1));
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  useEffect(() => {
    console.log(getUsersAnswers());
  }, [userAnswersKeysInd]);

  return (
    <form onSubmit={handleSubmit}>
      <UserSurveyElement
        questionTitle={getCurrentQuestion()!}
        questionOptions={isSurveyInProgress ? currentOptionsLabels : []}
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

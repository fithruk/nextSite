import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useUserSurvey } from "@/hooks/useUserSurvey";
import UserSurveyElement from "@/components/CommonComponents/UserSurveyElement/UserSurveyElement";
import { CaloriesCalculatorUserAsnswerType } from "../CaloriesCalculator/CaloriesCalculator";
import { FormEvent, useState } from "react";

const questions = ["Question_1", "Question_ 2"];

const options = ["Option_1", "Option_2"];

const FoodGenerator = () => {
  const { getItem } = useLocalStorage<CaloriesCalculatorUserAsnswerType>();
  const answers = getItem("userCaloriesCalculatorAnswers");
  const {
    getAllQuestions,
    getCurrentQuestion,
    saveUserAnswer,
    getUsersAnswers,
    nextQuestion,
    resetQuestion,
  } = useUserSurvey<string>(questions);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  console.log("render");

  return (
    <form onSubmit={handleSubmit}>
      <UserSurveyElement
        questionTitle={getCurrentQuestion()!}
        questionOptions={options}
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

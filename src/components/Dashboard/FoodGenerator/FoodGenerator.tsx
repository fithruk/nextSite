import axios from "axios";
import foodGeneratorStyles from "./foodGenerator.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useUserSurvey } from "@/hooks/useUserSurvey";
import UserSurveyElement from "@/components/CommonComponents/UserSurveyElement/UserSurveyElement";
import { CaloriesCalculatorUserAsnswerType } from "../CaloriesCalculator/CaloriesCalculator";
import { FormEvent, useState, useEffect } from "react";
import { CaloriesCalculatorClass } from "@/classes/CaloriesCaculatorClass";
import foodData from "./foodData.json";
import { LocalStorageKeys } from "@/localSrorageKeys/localStorageKeys";
import {
  FoodPlanType,
  FoodTableStateType,
  SaveFoodRespType,
} from "@/types/types";
import { useSession } from "next-auth/react";
import FoodMenuItemsList from "../FoodMenuItemsList/FoodMenuItemsList";

const userAnswersKeysArray = Object.keys(foodData);

const questions = userAnswersKeysArray.map(
  (foodType) => `Choose products: ${foodType}`
);

const FoodGenerator = () => {
  const session = useSession();
  const email = session.data?.user.email;
  const token = session.data?.user.token;
  const { getItem } = useLocalStorage<CaloriesCalculatorUserAsnswerType>();
  const foodPlanStorage = useLocalStorage<FoodTableStateType>();
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

  const [userAnswersKeysInd, setUserAnswersKeysInd] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [foodState, setFoodState] = useState<FoodTableStateType | null>(null);

  const currentOptionsLabels =
    foodData[
      userAnswersKeysArray[userAnswersKeysInd] as keyof typeof foodData
    ]?.map((food: { name: string }) => food.name) ?? [];
  const isSurveyInProgress = userAnswersKeysInd < userAnswersKeysArray.length;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSurveyInProgress) {
      const userFoodPlan = CaloriesCalculatorClass.PrepareFoodPlan(
        answersFromCaloriesCalculator!,
        getUsersAnswers()
      );
      setFoodState(userFoodPlan);
      const { status } = await axios.post<SaveFoodRespType>(
        "/api/foodService/saveFood",
        {
          email,
          token,
          userFoodPlan,
        }
      );
      if (status === 200) {
        foodPlanStorage.setItem(
          LocalStorageKeys.generatedFoodPlan,
          userFoodPlan
        );
        console.log(status);

        alert("Succesed!");

        return;
      }
      alert("Error!");
    }

    saveUserAnswer(userAnswersKeysArray[userAnswersKeysInd], selectedOptions);
    setSelectedOptions([]);
    nextQuestion();
    setUserAnswersKeysInd((prev) => prev + 1);
  };

  const handleReset = () => {
    resetQuestion();
    setFoodState(null);
    setUserAnswersKeysInd(0);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  useEffect(() => {
    if (!isSurveyInProgress) {
      const foodPlan = CaloriesCalculatorClass.PrepareFoodPlan(
        answersFromCaloriesCalculator!,
        getUsersAnswers()
      );
      setFoodState(foodPlan);
    }
  }, [isSurveyInProgress]);

  return (
    <>
      {!isSurveyInProgress && foodState && <FoodMenuItemsList {...foodState} />}
      <form onSubmit={handleSubmit}>
        <UserSurveyElement
          questionTitle={getCurrentQuestion() ?? ""}
          questionOptions={isSurveyInProgress ? currentOptionsLabels : []}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
        />
        <div className={foodGeneratorStyles.buttonsWrapper}>
          <AppButton variant="secondary" type="submit">
            {getCurrentQuestion() ? "Next" : "Save"}
          </AppButton>
          {!getCurrentQuestion() && (
            <AppButton variant="secondary" type="button" onClick={handleReset}>
              Reset
            </AppButton>
          )}
        </div>
      </form>
    </>
  );
};

export default FoodGenerator;

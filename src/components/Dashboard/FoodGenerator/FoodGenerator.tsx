import foodGeneratorStyles from "./foodGenerator.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import { useUserSurvey } from "@/hooks/useUserSurvey";
import UserSurveyElement from "@/components/CommonComponents/UserSurveyElement/UserSurveyElement";
import { CaloriesCalculatorUserAsnswerType } from "../CaloriesCalculator/CaloriesCalculator";
import { FormEvent, useState, useEffect } from "react";
import { CaloriesCalculatorClass } from "@/classes/CaloriesCaculatorClass";
import foodData from "./foodData.json";
import { Typography } from "@/components/CommonComponents/Typography/Typography";

type NutrientsType = {
  name: string;
  grams: number;
  calories: number;
};

type FoodTableStateType = Partial<
  Record<"fats" | "vegetables" | "proteins" | "carbohydrates", NutrientsType[]>
>;

type FoodMenuItemsListTypes = FoodTableStateType;

const userAnswersKeysArray = Object.keys(foodData);

const questions = userAnswersKeysArray.map(
  (foodType) => `Choose products: ${foodType}`
);

const FoodMenuItemsList = ({
  fats,
  vegetables,
  proteins,
  carbohydrates,
}: FoodMenuItemsListTypes) => {
  const foodMenuItemsArray = Object.entries({
    fats,
    vegetables,
    proteins,
    carbohydrates,
  }).filter(([, value]) => value);

  const totalCalories = foodMenuItemsArray.reduce(
    (prev, [, items]) =>
      prev + (items?.reduce((sum, item) => sum + item.calories, 0) ?? 0),
    0
  );

  return (
    <ul className={foodGeneratorStyles.foodMenuItemsList}>
      {foodMenuItemsArray.map(([key, items]) => (
        <li key={key}>
          <strong>{key}</strong>:
          <ul>
            {items!.map((item, index) => (
              <li key={index}>
                {item.name} — {item.grams}g, {item.calories}kcal
              </li>
            ))}
          </ul>
        </li>
      ))}
      <li>
        <Typography type="p">
          <strong>Total Calories:</strong> {totalCalories}
        </Typography>
      </li>
    </ul>
  );
};

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

  const [userAnswersKeysInd, setUserAnswersKeysInd] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [foodState, setFoodState] = useState<FoodTableStateType | null>(null);

  const currentOptionsLabels =
    foodData[
      userAnswersKeysArray[userAnswersKeysInd] as keyof typeof foodData
    ]?.map((food: { name: string }) => food.name) ?? [];
  const isSurveyInProgress = userAnswersKeysInd < userAnswersKeysArray.length;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSurveyInProgress) {
      const foodPlan = CaloriesCalculatorClass.PrepareFoodPlan(
        answersFromCaloriesCalculator!,
        getUsersAnswers()
      );
      setFoodState(foodPlan);
      console.log("Submit");

      return;
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

import { useState } from "react";

interface IUseUserSurvey<T> {
  getAllQuestions: () => Array<T>;
  getCurrentQuestion: () => T | undefined;
  getCurrentQuestionInd: () => number;
  saveUserAnswer: (key: string, value: AnswersType) => void;
  getUsersAnswers: () => UserAnswerType;
  nextQuestion: () => void;
  resetQuestion: () => void;
}

type AnswersType = { [key: string]: string };
type UserAnswerType = {
  [key: string]: AnswersType[];
};

const useUserSurvey = <T,>(questions: Array<T>): IUseUserSurvey<T> => {
  const [currentQuestionInd, setCurrentQuestionInd] = useState<number>(0);
  const [allQuestions, SetAllQuestions] = useState<Array<T>>(questions);
  const [userAnswers, setUserAnswers] = useState<UserAnswerType>({
    carbohidrates: [],
    proteins: [],
  });
  const getAllQuestions = () => {
    return allQuestions;
  };

  const getCurrentQuestion = () => {
    return allQuestions[currentQuestionInd];
  };

  const getCurrentQuestionInd = () => {
    if (currentQuestionInd >= allQuestions.length - 1) {
      return allQuestions.length - 1;
    }
    return currentQuestionInd;
  };

  const nextQuestion = () => {
    if (currentQuestionInd < allQuestions.length) {
      setCurrentQuestionInd(currentQuestionInd + 1);
    }
  };

  const resetQuestion = () => {
    setCurrentQuestionInd(0);
  };

  const saveUserAnswer = (key: string, value: AnswersType) => {
    setUserAnswers((state) => ({
      ...state,
      [key]: state[key] ? [...state[key], value] : [value],
    }));
  };

  const getUsersAnswers = () => {
    return userAnswers;
  };

  return {
    getAllQuestions,
    getCurrentQuestion,
    getCurrentQuestionInd,
    saveUserAnswer,
    getUsersAnswers,
    nextQuestion,
    resetQuestion,
  };
};

export { useUserSurvey };

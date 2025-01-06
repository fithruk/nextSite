import { useState } from "react";

interface IUseUserSurvey<T> {
  getAllQuestions: () => Array<T>;
  getCurrentQuestion: () => T | undefined;
  //   setQuestionsForServey: (questions: Array<T>) => void;
  nextQuestion: () => void;
  resetQuestion: () => void;
}

const useUserSurvey = <T,>(questions: Array<T>): IUseUserSurvey<T> => {
  const [currentQuestionInd, setCurrentQuestionInd] = useState<number>(0);
  const [allQuestions, SetAllQuestions] = useState<Array<T>>(questions);
  const getAllQuestions = () => {
    return allQuestions;
  };

  const getCurrentQuestion = () => {
    return allQuestions[currentQuestionInd];
  };

  const nextQuestion = () => {
    if (currentQuestionInd < allQuestions.length) {
      setCurrentQuestionInd(currentQuestionInd + 1);
    }
  };

  const resetQuestion = () => {
    setCurrentQuestionInd(0);
  };

  //   const setQuestionsForServey = (questions: Array<T>) => {
  //     SetAllQuestions(questions);
  //   };

  return {
    getAllQuestions,
    getCurrentQuestion,
    // setQuestionsForServey,
    nextQuestion,
    resetQuestion,
  };
};

export { useUserSurvey };

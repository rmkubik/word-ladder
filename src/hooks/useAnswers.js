import { useState } from "react";

const useAnswers = () => {
  const [answers, setAnswers] = useState([false]);

  const initAnswers = (numberOfAnswers) => {
    setAnswers(new Array(numberOfAnswers).fill(false));
  };

  const setCorrect = (index) => {
    setAnswers([...answers.slice(0, index), true, ...answers.slice(index + 1)]);
  };

  const areAllAnswersCompleted = () => {
    return answers.every((answer) => answer === true);
  };

  return {
    answers,
    initAnswers,
    setCorrect,
    areAllAnswersCompleted,
  };
};

export default useAnswers;

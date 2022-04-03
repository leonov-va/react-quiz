import React, { useContext, useEffect } from "react";
import { QuizContext } from "../../contexts/quizContext";
import Congratulations from "../Congratulations/Congratulations";
import Loader from "../Loader/Loader";
import Question from "../Question/Question";
import Button from "../UI/Button/Button";
import "./Quiz.scss";

const Quiz: React.FC = () => {
  const { quizState, dispatch } = useContext(QuizContext);
  const apiUrl =
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple&encode=url3986";

  useEffect(() => {
    if (quizState.questions.length > 0) {
      return;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "LOADED_QUESTIONS", payload: data.results })
      )
      .catch((err) => console.error(err));
  });

  return (
    <div className="quiz">
      {quizState.showResults ? (
        <Congratulations />
      ) : quizState.questions.length ? (
        <>
          <div className="quiz__score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <Button
            className="quiz__next-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next question
          </Button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Quiz;

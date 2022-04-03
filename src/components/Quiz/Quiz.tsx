import React, { useContext } from "react";
import { QuizContext } from "../../contexts/quiz";
import Congratulations from "../Congratulations/Congratulations";
import Question from "../Question/Question";
import Button from "../UI/Button/Button";
import "./Quiz.scss";

const Quiz: React.FC = () => {
  const { quizState, dispatch } = useContext(QuizContext);

  return (
    <div className="quiz">
      {quizState.showResults ? (
        <Congratulations />
      ) : (
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
      )}
    </div>
  );
};

export default Quiz;

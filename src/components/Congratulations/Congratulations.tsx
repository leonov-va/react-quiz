import React, { useContext } from "react";
import { QuizContext } from "../../contexts/quizContext";
import Button from "../UI/Button/Button";
import "./Congratulations.scss";

const Congratulations: React.FC = () => {
  const { quizState, dispatch } = useContext(QuizContext);

  return (
    <div className="congratulations">
      <div className="congratulations__title">Congratulations</div>
      <div className="congratulations__info">
        <div>You have complete the quiz.</div>
        <div>
          You've got {quizState.correctAnswersCount} of{" "}
          {quizState.questions.length}
        </div>
        <Button
          className="congratulations__next-button"
          onClick={() => dispatch({ type: "RESTART" })}
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

export default Congratulations;

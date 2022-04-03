import React, { useContext } from "react";
import { QuizContext } from "../../contexts/quizContext";
import Answer from "../Answer/Answer";
import "./Question.scss";

const Question: React.FC = () => {
  const { quizState, dispatch } = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <div className="question">
      <div className="question__name">{currentQuestion.question}</div>
      <div className="question__answers">
        {quizState.answers.map((answer, index) => (
          <Answer
            key={index}
            index={index}
            answerText={answer}
            correctAnswer={currentQuestion.correctAnswer}
            currentAnswer={quizState.currentAnswer}
            onSelectAnswer={(answerText) =>
              dispatch({ type: "SELECT_ANSWER", payload: answerText })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Question;

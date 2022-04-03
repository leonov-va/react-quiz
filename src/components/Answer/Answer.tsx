import React from "react";
import "./Answer.scss";

interface IAnswer {
  answerText: string;
  index: number;
  correctAnswer: string;
  currentAnswer: string;
  onSelectAnswer: (answer: string) => void;
}

const LETTER_MAPPING: string[] = ["A", "B", "C", "D"];

const Answer: React.FC<IAnswer> = React.memo((props) => {
  const { answerText, index, correctAnswer, currentAnswer, onSelectAnswer } =
    props;
    
  const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
  const isWrongAnswer =
    currentAnswer === answerText && currentAnswer !== correctAnswer;

  const correctAnserClass = isCorrectAnswer ? "answer--correct" : "";
  const wrongAnswerClass = isWrongAnswer ? "answer--wrong" : "";
  const disabledClass = currentAnswer ? "answer--disabled" : "";

  return (
    <div
      className={`answer ${correctAnserClass} ${wrongAnswerClass} ${disabledClass}`}
      onClick={() => onSelectAnswer(answerText)}
    >
      <div className="answer__letter">{LETTER_MAPPING[index]}</div>
      <div className="answer__text">{answerText}</div>
    </div>
  );
});

export default Answer;

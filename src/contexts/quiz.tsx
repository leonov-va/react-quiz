import { createContext, useReducer } from "react";
import questions from "../fixtures/quiz";
import { shuffleAnswers } from "../helpers";

interface QuizContext {
  questions: any[];
  currentQuestionIndex: number;
  showResults: boolean;
  answers: any[];
  currentAnswer: string;
  correctAnswersCount: number;
}

const initialState: QuizContext = {
  questions,
  currentQuestionIndex: 0,
  showResults: false,
  answers: shuffleAnswers(questions[0]),
  currentAnswer: "",
  correctAnswersCount: 0,
};

// ##########################################

type ActionsMap = {
  NEXT_QUESTION: null;
  RESTART: null;
  SELECT_ANSWER: string;
};

type Actions = {
  [key in keyof ActionsMap]: {
    type: key;
    payload: ActionsMap[key];
  };
}[keyof ActionsMap];

// ##########################################

const quizReducer = (state: QuizContext, action: any): QuizContext => {
  switch (action.type) {
    case "SELECT_ANSWER": {
      const correctAnswersCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount;

      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
      };
    }
    case "NEXT_QUESTION": {
      const showResults: boolean =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex: number = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);

      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: "",
      };
    }
    case "RESTART": {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

// ##########################################

const QuizContext = createContext<{
  quizState: QuizContext;
  dispatch: React.Dispatch<any>;
}>({ quizState: initialState, dispatch: () => null });

// ##########################################

const QuizProvider: React.FC = ({ children }) => {
  const [quizState, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ quizState, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };

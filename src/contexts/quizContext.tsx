import { createContext, useReducer } from "react";
import { normalizeQuestions, shuffleAnswers } from "../helpers";

export type QuestionType = {
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
};

interface QuizContext {
  questions: QuestionType[];
  currentQuestionIndex: number;
  showResults: boolean;
  answers: string[];
  currentAnswer: string;
  correctAnswersCount: number;
}

const initialState: QuizContext = {
  questions: [],
  currentQuestionIndex: 0,
  showResults: false,
  answers: [],
  currentAnswer: "",
  correctAnswersCount: 0,
};

// ##########################################

type ActionsMap = {
  NEXT_QUESTION: null;
  RESTART: null;
  SELECT_ANSWER: string;
  LOADED_QUESTIONS: any[];
};

type Actions = {
  [key in keyof ActionsMap]: {
    type: key;
    payload: ActionsMap[key];
  };
}[keyof ActionsMap];

// ########################################## Quiz Reducer

const quizReducer = (state: QuizContext, action: Actions): QuizContext => {
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
    case "LOADED_QUESTIONS": {
      const normalizedQuestions = normalizeQuestions(action.payload);

      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0]),
      };
    }
    default: {
      return state;
    }
  }
};

// ########################################## Create Context

const QuizContext = createContext<{
  quizState: QuizContext;
  dispatch: React.Dispatch<any>;
}>({ quizState: initialState, dispatch: () => null });

// ########################################## QuizContext Provider

const QuizProvider: React.FC = ({ children }) => {
  const [quizState, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ quizState, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };

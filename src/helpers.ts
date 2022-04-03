import { QuestionType } from "./contexts/quizContext";

/**
 * Shuffle answers
 * @param question - QuestionType
 * @returns Array of Shuffled Responses
 */

export const shuffleAnswers = (question: QuestionType): string[] => {
  const unshuffledAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers,
  ];

  return unshuffledAnswers
    .map((unshuffledAnswer) => ({
      sort: Math.random(),
      value: unshuffledAnswer,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

/**
 * Normalize questions
 * @param backendQuestions
 * @returns Cast questions to QuestionType type
 */

export const normalizeQuestions = (backendQuestions: any[]) => {
  return backendQuestions.map((backendQuestion: any) => {
    const incorrectAnswers: string[] = backendQuestion.incorrect_answers.map(
      (incorrectAnswer: string) => decodeURIComponent(incorrectAnswer)
    );

    return {
      correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
      question: decodeURIComponent(backendQuestion.question),
      incorrectAnswers,
    };
  });
};

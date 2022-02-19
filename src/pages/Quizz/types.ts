export type CorrectAnswer = {
  value: string;
};

export type Declaration = {
  identifier: string;
  correctResponse: CorrectAnswer;
};

export type QuizzChoice = {
  identifier: string;
  text: string;
};

export type QuizzElement = {
  question: string;
  responseIdentifier: string;
  choices: QuizzChoice[];
};

export type QuizzOption = {
  type: string;
  value: string;
};

export type Quizz = {
  identifier: string;
  title: string;
  subtitle: string;
  responseDeclaration: Declaration[];
  elements: QuizzElement[];
  options: QuizzOption[];
};

export const GET_QUIZZ_SUCCESS = 'GET_QUIZZES_SUCCESS';
export type GetQuizzSuccessAction = {
  type: typeof GET_QUIZZ_SUCCESS;
  payload: Quizz;
};

export type quizzActionTypes = GetQuizzSuccessAction;

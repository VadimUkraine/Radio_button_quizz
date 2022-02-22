export type CorrectAnswer = {
  value: string;
};

export type ResponseDeclaration = {
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
  responseDeclaration: ResponseDeclaration[];
  elements: QuizzElement[];
  options: QuizzOption[];
};

export enum ChoiceOrder {
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
}

export type SelectedChoices = {
  questionIdentifier: string;
  choice: string;
};

export type ErrorHttpAction = string;

export const GET_QUIZZ_REQUEST = 'GET_QUIZZ_REQUEST';
export type GetQuizzAction = {
  type: typeof GET_QUIZZ_REQUEST;
};

export const GET_QUIZZ_SUCCESS = 'GET_QUIZZ_SUCCESS';
export type GetQuizzSuccessAction = {
  type: typeof GET_QUIZZ_SUCCESS;
  payload: Quizz;
};

export const GET_QUIZZ_FAILURE = 'GET_QUIZZ_FAILURE';
export type GetQuizzFailureAction = {
  type: typeof GET_QUIZZ_FAILURE;
  payload: ErrorHttpAction;
};

export type quizzActionTypes =
  | GetQuizzAction
  | GetQuizzSuccessAction
  | GetQuizzFailureAction;

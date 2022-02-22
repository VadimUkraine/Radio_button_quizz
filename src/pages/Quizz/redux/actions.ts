import {
  quizzActionTypes,
  GET_QUIZZ_REQUEST,
  GET_QUIZZ_SUCCESS,
  Quizz,
  ErrorHttpAction,
  GET_QUIZZ_FAILURE,
} from '../types';

export function getQuizzAction(): quizzActionTypes {
  return {
    type: GET_QUIZZ_REQUEST,
  };
}

export function getQuizzSuccessAction(payload: Quizz): quizzActionTypes {
  return {
    type: GET_QUIZZ_SUCCESS,
    payload,
  };
}

export function getQuizzFailureAction(
  payload: ErrorHttpAction
): quizzActionTypes {
  return {
    type: GET_QUIZZ_FAILURE,
    payload,
  };
}

import {
  quizzActionTypes,
  Quizz,
  GET_QUIZZ_REQUEST,
  GET_QUIZZ_SUCCESS,
  GET_QUIZZ_FAILURE,
  ErrorHttpAction,
} from '../types';

export type QuizzState = {
  data: Quizz;
  isFetching: boolean;
  error: false | ErrorHttpAction;
};

const initialState: QuizzState = {
  data: {
    identifier: 'Identify:Select:Radiobutton',
    title: 'Geography exercise',
    subtitle: 'Answer the questions in order',
    responseDeclaration: [
      {
        identifier: 'RESPONSE0',
        correctResponse: {
          value: 'C0_0',
        },
      },
      {
        identifier: 'RESPONSE1',
        correctResponse: {
          value: 'C1_0',
        },
      },
      {
        identifier: 'RESPONSE2',
        correctResponse: {
          value: 'C2_0',
        },
      },
    ],
    elements: [
      {
        question:
          'Which one of the following countries belong to South America?',
        responseIdentifier: 'RESPONSE0',
        choices: [
          {
            identifier: 'C0_0',
            text: 'Guiana, Equator, Bolivia',
          },
          {
            identifier: 'C0_1',
            text: 'Belize, Guiana, Equator',
          },
          {
            identifier: 'C0_2',
            text: 'Belize, Panama, Bolivia',
          },
        ],
      },
      {
        question: 'Where did the Velvet Revolution take place?',
        responseIdentifier: 'RESPONSE1',
        choices: [
          {
            identifier: 'C1_0',
            text: 'Czechoslovakia',
          },
          {
            identifier: 'C1_1',
            text: 'Bielorussia',
          },
          {
            identifier: 'C1_2',
            text: 'Turkey',
          },
        ],
      },
      {
        question:
          'Which of the following countries were part of ex-Youguslavia?',
        responseIdentifier: 'RESPONSE2',
        choices: [
          {
            identifier: 'C2_0',
            text: 'Croatia, Bosnia & Herzegovina, Macedonia',
          },
          {
            identifier: 'C2_1',
            text: 'Bosnia & Herzegovina, Bulgaria, Slovenia',
          },
          {
            identifier: 'C2_2',
            text: 'Albania, Bulgaria, Montenegro',
          },
        ],
      },
    ],
    options: [
      {
        type: 'choiceAlignment',
        value: 'vertical',
      },
      {
        type: 'tryAgain',
        value: 'clear',
      },
    ],
  },
  isFetching: false,
  error: false,
};

export const quizzReducer = (
  state = initialState,
  action: quizzActionTypes
): QuizzState => {
  switch (action.type) {
    case GET_QUIZZ_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case GET_QUIZZ_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case GET_QUIZZ_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

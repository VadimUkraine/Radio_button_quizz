import { delay, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { GET_QUIZZ_REQUEST } from '../types';

import { getQuizzSuccessAction, getQuizzFailureAction } from './actions';

function* getQuizzSaga(): SagaIterator {
  try {
    yield delay(1000);

    const quizz = {
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
    };

    yield put(getQuizzSuccessAction(quizz));
  } catch (err) {
    yield put(getQuizzFailureAction((err as Error).message));
  }
}

export function* quizzSagaWatcher(): SagaIterator {
  yield takeLatest(GET_QUIZZ_REQUEST, getQuizzSaga);
}

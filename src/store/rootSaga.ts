import { all } from 'redux-saga/effects';
import { quizzSagaWatcher } from '../pages/Quizz/redux/saga';

export default function* rootSaga(): Generator {
  yield all([quizzSagaWatcher()]);
}

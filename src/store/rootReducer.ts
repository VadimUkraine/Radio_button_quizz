import { combineReducers } from 'redux';

import { quizzReducer as quizz } from '../pages/Quizz/redux/reducer';

const rootReducer = combineReducers({
  quizz,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

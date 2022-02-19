import React, { FC } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';

import Quizz from './pages/Quizz';

const store = configureStore();

export const App: FC = () => (
  <Provider store={store}>
    <Quizz />
  </Provider>
);

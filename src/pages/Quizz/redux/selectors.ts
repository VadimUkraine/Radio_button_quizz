import { RootState } from '../../../store/rootReducer';

export const getTodos = (state: RootState) => state.todos.data;

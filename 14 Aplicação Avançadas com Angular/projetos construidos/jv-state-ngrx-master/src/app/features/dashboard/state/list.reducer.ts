import { createReducer, Action, on } from '@ngrx/store';

import { Todo } from '../../../shared/models/todo.model';
import * as fromListActions from './list.actions';

export interface ListState {
  entities: Todo[];
  loading: boolean;
  loadingMore: boolean;
  error: boolean;
  page: number;
  creating: boolean;
  removing: boolean;
}

export const listInitialState: ListState = {
  entities: [],
  loading: false,
  loadingMore: false,
  error: false,
  page: 0,
  creating: false,
  removing: false,
};

export const reducer = createReducer(
  listInitialState,
  on(
    fromListActions.loadListFromLastTodos,
    fromListActions.loadListFromList,
    state => ({
      ...state,
      loading: true,
      error: false,
      page: 0,
    }),
  ),
  on(fromListActions.loadMore, state => ({
    ...state,
    loadingMore: true,
    page: state.page + 1,
  })),
  on(fromListActions.notifyHydrated, state => ({
    ...state,
    loading: false,
  })),
  on(fromListActions.loadListSuccess, (state, { entities }) => ({
    ...state,
    entities: [...state.entities, ...entities],
    loading: false,
    loadingMore: false,
  })),
  on(fromListActions.loadListFailure, state => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(fromListActions.createTodo, state => ({
    ...state,
    creating: true,
  })),
  on(fromListActions.createTodoSuccess, (state, { todo }) => ({
    ...state,
    entities: [todo, ...state.entities],
    creating: false,
  })),
  on(fromListActions.createTodoFailure, state => ({
    ...state,
    creating: false,
  })),
  on(fromListActions.removeTodo, state => ({
    ...state,
    removing: true,
  })),
  on(fromListActions.removeTodoSuccess, (state, { id }) => ({
    ...state,
    entities: state.entities.filter(item => item.id !== id),
    removing: false,
  })),
  on(fromListActions.removeTodoFailure, state => ({
    ...state,
    removing: false,
  })),
);

export function listReducer(state: ListState | undefined, action: Action): ListState {
  return reducer(state, action);
}

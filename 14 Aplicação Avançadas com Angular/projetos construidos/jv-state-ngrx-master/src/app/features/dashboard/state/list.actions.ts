import { createAction, props } from '@ngrx/store';

import { Todo } from 'src/app/shared/models/todo.model';

export const loadListFromLastTodos = createAction(
  '[Last Todos] Load List',
);

export const loadListFromList = createAction(
  '[List] Load List',
);

export const loadMore = createAction(
  '[List] Load More',
);

export const notifyHydrated = createAction(
  '[List Effects] Notify Hydrated',
);

export const loadListSuccess = createAction(
  '[API] Load List Success',
  props<{ entities: Todo[] }>(),
);

export const loadListFailure = createAction(
  '[API] Load List Failure',
);

export const createTodo = createAction(
  '[Crete Todo] Create',
  props<{ title: string }>(),
);

export const createTodoSuccess = createAction(
  '[API] Create Todo Success',
  props<{ todo: Todo }>(),
);

export const createTodoFailure = createAction(
  '[API] Create Todo Failure',
);

export const removeTodo = createAction(
  '[List] Remove Todo',
  props<{ id: number }>(),
);

export const removeTodoSuccess = createAction(
  '[List] Remove Todo Success',
  props<{ id: number }>(),
);

export const removeTodoFailure = createAction(
  '[List] Remove Todo Failure',
);

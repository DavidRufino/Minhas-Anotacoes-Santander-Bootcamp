import { TestBed } from '@angular/core/testing';

import { Observable, of, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';

import { ListEffects } from './list.effects';
import { listInitialState } from './list.reducer';
import { TodosService } from 'src/app/shared/services/todos.service';
import { Todo } from '../../../shared/models/todo.model';
import * as fromListActions from './list.actions';

describe('ListEffects', () => {
  let actions$: Observable<Action>;
  let effects: ListEffects;
  let store: MockStore<any>;
  let service: TodosService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: { list: listInitialState } }),
        {
          provide: TodosService,
          useValue: {
            getList: () => {},
          },
        },
      ],
    });

    effects = TestBed.inject(ListEffects);
    store = TestBed.inject(MockStore);
    service = TestBed.inject(TodosService);
  });

  describe('loadList$', () => {
    it('should dispatch #notifyHydrated when page is zero and entities >= 10', () => {
      store.setState({
        list: {
          ...listInitialState,
          entities: new Array(10).fill({} as Todo),
        },
      });

      actions$ = hot('a', { a: fromListActions.loadListFromLastTodos() });
      const expected = cold('b', { b: fromListActions.notifyHydrated() });

      expect(effects.loadList$).toBeObservable(expected);
    });

    it('should return #loadListSuccess', () => {
      spyOn(service, 'getList').and.returnValue(of([]));

      actions$ = hot('a', { a: fromListActions.loadListFromLastTodos() });
      const expected = cold('b', { b: fromListActions.loadListSuccess({ entities: [] }) });

      expect(effects.loadList$).toBeObservable(expected);
    });

    it('should return #loadListFailure', () => {
      spyOn(service, 'getList').and.returnValue(throwError({}));

      actions$ = hot('a', { a: fromListActions.loadListFromLastTodos() });
      const expected = cold('b', { b: fromListActions.loadListFailure() });

      expect(effects.loadList$).toBeObservable(expected);
    });
  });
});

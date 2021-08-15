import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from 'src/app/state/app.reducer';
import { Todo } from '../../../shared/models/todo.model';
import * as fromListAction from '../state/list.actions';
import * as fromListSelectors from '../state/list.selectors';

@Component({
  selector: 'jv-last-todos',
  templateUrl: './last-todos.component.html',
  styleUrls: ['./last-todos.component.scss']
})
export class LastTodosComponent implements OnInit {

  list$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(fromListAction.loadListFromLastTodos());

    this.list$ = this.store
    .pipe(
      select(fromListSelectors.selectListEntities),
      map(entities => entities.slice(0, 10)),
    );
    this.loading$ = this.store.pipe(select(fromListSelectors.selectListLoading));
  }

  markAsDone(id: number) {
    
  }
}

import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/state/app.reducer';
import * as fromAppSelectors from '../../../state/app.selectors';

@Component({
  selector: 'jv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  name$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.name$ = this.store.pipe(select(fromAppSelectors.selectUserName));
  }
}

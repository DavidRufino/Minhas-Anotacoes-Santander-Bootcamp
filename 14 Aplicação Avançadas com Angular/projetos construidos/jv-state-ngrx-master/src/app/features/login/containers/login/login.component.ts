import { Component } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as fromAppActions from '../../../../state/app.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private store: Store<AppState>) {
  }

  login() {
    this.store.dispatch(fromAppActions.doLogin(this.form.value));
  }
}

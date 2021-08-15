import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ListComponent } from './list.component';
import { listInitialState } from '../state/list.reducer';
import * as fromListActions from '../state/list.actions';
import * as fromListSelectors from '../state/list.selectors';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;

  let store: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [
        ListComponent,
      ],
      providers: [
        provideMockStore({ initialState: { list: listInitialState } }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading indicator', () => {
    store.setState({
      list: {
        ...listInitialState,
        loading: true,
      },
    });
    fixture.detectChanges();

    const loading = fixture.debugElement.query(By.css('span'));

    expect(loading).toBeTruthy();
  });

  it('should dispatch removeTodo action', () => {
    spyOn(store, 'dispatch');

    component.onDelete(123);

    expect(store.dispatch).toHaveBeenCalledWith(fromListActions.removeTodo({ id: 123 }));
  });
});

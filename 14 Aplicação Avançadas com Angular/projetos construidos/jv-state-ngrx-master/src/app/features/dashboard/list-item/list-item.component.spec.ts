import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Todo } from 'src/app/shared/models/todo.model';

import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let debugEl: DebugElement;

  let cd: ChangeDetectorRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListItemComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;

    cd = fixture.componentRef.injector.get(ChangeDetectorRef);

    component.item = {
      id: 1,
    } as Todo;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on mark as done click', () => {
    spyOn(component.markAsDone, 'emit');
    const checkbox = debugEl.query(By.css('.checkbox'));

    checkbox.triggerEventHandler('click', null);

    expect(component.markAsDone.emit).toHaveBeenCalledWith(1);
  });

  it('should update title', () => {
    component.item.title = 'Test';
    cd.detectChanges();

    const h3 = debugEl.query(By.css('h3')).nativeElement as Element;

    expect(h3.textContent).toBe('Test');
  });
});

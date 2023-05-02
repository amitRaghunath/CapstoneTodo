import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTaskDetailsComponent } from './todo-task-details.component';

describe('TodoTaskDetailsComponent', () => {
  let component: TodoTaskDetailsComponent;
  let fixture: ComponentFixture<TodoTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoTaskDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

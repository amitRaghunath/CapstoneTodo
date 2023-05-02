import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoOfCategoryComponent } from './todo-of-category.component';

describe('TodoOfCategoryComponent', () => {
  let component: TodoOfCategoryComponent;
  let fixture: ComponentFixture<TodoOfCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoOfCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoOfCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

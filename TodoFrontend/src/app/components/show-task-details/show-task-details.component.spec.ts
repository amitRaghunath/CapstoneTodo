import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTaskDetailsComponent } from './show-task-details.component';

describe('ShowTaskDetailsComponent', () => {
  let component: ShowTaskDetailsComponent;
  let fixture: ComponentFixture<ShowTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTaskDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

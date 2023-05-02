import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPrioritiesComponent } from './show-priorities.component';

describe('ShowPrioritiesComponent', () => {
  let component: ShowPrioritiesComponent;
  let fixture: ComponentFixture<ShowPrioritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPrioritiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPrioritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

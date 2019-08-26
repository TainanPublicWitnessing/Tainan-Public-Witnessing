import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyShiftComponent } from './monthly-shift.component';

describe('MonthlyShiftComponent', () => {
  let component: MonthlyShiftComponent;
  let fixture: ComponentFixture<MonthlyShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

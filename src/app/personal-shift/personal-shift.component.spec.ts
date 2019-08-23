import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalShiftComponent } from './personal-shift.component';

describe('PersonalShiftComponent', () => {
  let component: PersonalShiftComponent;
  let fixture: ComponentFixture<PersonalShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

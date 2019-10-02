import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftReportPage } from './shift-report.page';

describe('ShiftReportPage', () => {
  let component: ShiftReportPage;
  let fixture: ComponentFixture<ShiftReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftReportListPage } from './shift-report-list.page';

describe('ShiftReportListPage', () => {
  let component: ShiftReportListPage;
  let fixture: ComponentFixture<ShiftReportListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftReportListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftReportListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

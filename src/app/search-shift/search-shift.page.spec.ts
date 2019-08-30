import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchShiftPage } from './search-shift.page';

describe('SearchShiftPage', () => {
  let component: SearchShiftPage;
  let fixture: ComponentFixture<SearchShiftPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchShiftPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShiftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberManagementPage } from './member-management.page';

describe('MemberManagementPage', () => {
  let component: MemberManagementPage;
  let fixture: ComponentFixture<MemberManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberManagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftEditorPage } from './shift-editor.page';

describe('ShiftEditorPage', () => {
  let component: ShiftEditorPage;
  let fixture: ComponentFixture<ShiftEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftEditorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

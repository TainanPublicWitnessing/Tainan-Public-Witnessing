import { TestBed } from '@angular/core/testing';

import { LoginDialogService } from './login-dialog.service';

describe('LoginDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginDialogService = TestBed.get(LoginDialogService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProfileAdminService } from './profile-admin.service';

describe('ProfileAdminService', () => {
  let service: ProfileAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

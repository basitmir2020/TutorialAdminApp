import { TestBed } from '@angular/core/testing';

import { ManageExamTypeService } from './manage-exam-type.service';

describe('ManageExamTypeService', () => {
  let service: ManageExamTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageExamTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

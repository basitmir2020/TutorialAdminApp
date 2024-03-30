import { TestBed } from '@angular/core/testing';

import { ManageExamHttpTypeService } from './manage-exam-http-type.service';

describe('ManageExamHttpTypeService', () => {
  let service: ManageExamHttpTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageExamHttpTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

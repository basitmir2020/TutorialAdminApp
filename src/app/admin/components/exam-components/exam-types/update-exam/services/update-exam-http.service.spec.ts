import { TestBed } from '@angular/core/testing';

import { UpdateExamHttpService } from './update-exam-http.service';

describe('UpdateExamHttpService', () => {
  let service: UpdateExamHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateExamHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

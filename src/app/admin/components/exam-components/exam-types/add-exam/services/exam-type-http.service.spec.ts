import { TestBed } from '@angular/core/testing';

import { ExamTypeHttpService } from './exam-type-http.service';

describe('ExamTypeHttpService', () => {
  let service: ExamTypeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamTypeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

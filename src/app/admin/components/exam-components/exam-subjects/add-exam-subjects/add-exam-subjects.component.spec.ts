import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamSubjectsComponent } from './add-exam-subjects.component';

describe('AddExamSubjectsComponent', () => {
  let component: AddExamSubjectsComponent;
  let fixture: ComponentFixture<AddExamSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamSubjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExamSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

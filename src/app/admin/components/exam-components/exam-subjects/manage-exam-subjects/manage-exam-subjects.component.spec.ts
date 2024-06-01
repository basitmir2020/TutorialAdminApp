import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExamSubjectsComponent } from './manage-exam-subjects.component';

describe('ManageExamSubjectsComponent', () => {
  let component: ManageExamSubjectsComponent;
  let fixture: ComponentFixture<ManageExamSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageExamSubjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageExamSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

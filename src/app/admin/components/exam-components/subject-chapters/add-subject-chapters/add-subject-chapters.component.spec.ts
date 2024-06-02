import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectChaptersComponent } from './add-subject-chapters.component';

describe('AddSubjectChaptersComponent', () => {
  let component: AddSubjectChaptersComponent;
  let fixture: ComponentFixture<AddSubjectChaptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubjectChaptersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSubjectChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

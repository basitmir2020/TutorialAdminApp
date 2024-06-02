import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubjectChaptersComponent } from './manage-subject-chapters.component';

describe('ManageSubjectChaptersComponent', () => {
  let component: ManageSubjectChaptersComponent;
  let fixture: ComponentFixture<ManageSubjectChaptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubjectChaptersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSubjectChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

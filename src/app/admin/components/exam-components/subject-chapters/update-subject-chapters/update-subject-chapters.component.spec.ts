import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubjectChaptersComponent } from './update-subject-chapters.component';

describe('UpdateSubjectChaptersComponent', () => {
  let component: UpdateSubjectChaptersComponent;
  let fixture: ComponentFixture<UpdateSubjectChaptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSubjectChaptersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSubjectChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

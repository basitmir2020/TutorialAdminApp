import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAddChapterComponent } from './subject-add-chapter.component';

describe('SubjectAddChapterComponent', () => {
  let component: SubjectAddChapterComponent;
  let fixture: ComponentFixture<SubjectAddChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectAddChapterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectAddChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

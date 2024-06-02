export class SubjectChaptersDto {
  subjectId: number;
  chapterName: string;

  constructor(subjectId: number, chapterName: string) {
    this.subjectId = subjectId;
    this.chapterName = chapterName;
  }
}

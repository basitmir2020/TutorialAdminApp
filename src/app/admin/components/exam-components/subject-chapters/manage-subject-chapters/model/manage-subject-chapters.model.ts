export class GetAllSubjectChapters{
  id: number;
  subjectName : string;
  chapterName : string;
  sequence?: number | null;
  status: string;

  constructor(
    id: number,
    chapterName: string,
    subjectsName: string,
    status: string,
    sequence?: number | null,
  ) {
    this.id = id;
    this.chapterName = chapterName;
    this.subjectName = subjectsName;
    this.status = status;
    this.sequence = sequence;
  }
}

export class DeleteSubjectChapters {
  subjectChapterId: number;
}

export class SubjectChapterStatus{
  subjectChapterId: number;
  statusId: number;
}

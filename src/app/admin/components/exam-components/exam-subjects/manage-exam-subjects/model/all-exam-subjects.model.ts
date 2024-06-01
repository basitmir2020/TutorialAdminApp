export class GetAllExamSubjects{
  id: number;
  examType: string;
  subjectsName : string;
  sequence?: number | null;
  status: string;

  constructor(
    id: number,
    examType: string,
    subjectsName: string,
    status: string,
    sequence?: number | null,
  ) {
    this.id = id;
    this.examType = examType;
    this.subjectsName = subjectsName;
    this.status = status;
    this.sequence = sequence;
  }
}

export class DeleteExamSubjects {
  examSubjectsId: number;
}

export class examSubjectStatus{
  examSubjectsId: number;
  statusId: number;
}

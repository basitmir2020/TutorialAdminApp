export class GetAllExamTypes {
  id: number;
  sequence?: number | null;
  countryName: string;
  examType: string;
  examSubType: string;
  status: string;

  constructor(
    id: number,
    countryName: string,
    examType: string,
    examSubType: string,
    status: string,
    sequence?: number | null
  ) {
    this.id = id;
    this.countryName = countryName;
    this.examType = examType;
    this.examSubType = examSubType;
    this.status = status;
    this.sequence = sequence;
  }
}

export class DeleteExamType
{
  examTypeId : number;
}

export class ChangeStatus{
  examTypeId:number;
  statusId:number;
}

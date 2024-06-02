export class UserDto {
  id: string;
  userName: string;
  email?: string | null;
  role?: string | null;
  phoneNumber?: string | null;
}

export class CountryDto {
  id: number;
  countryName: string;
  countryCode: string;
}

export class ExamTypeVM
{
  id : number;
  examType : string;
}

export class ExamSubjectsVM {
  id : number;
  subjectName : string;
}

class SubjectChaptersVM {
  id: number;
  chapterName: string;
  sequence: number;

  constructor(id: number, chapterName: string, sequence: number) {
    this.id = id;
    this.chapterName = chapterName;
    this.sequence = sequence;
  }
}

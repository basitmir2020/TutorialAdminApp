export interface LoginModel{
  "email":string;
  "password":string;
}

export class TokenResponseViewModel {
  statusCode: number;
  success: boolean;
  message: string | null;
  token: string | null;
  }

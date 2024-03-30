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

export interface userDTO {
  name: string;
  email: string;
  password?: string;
  birthDate: string;
}

export interface userCreatedDTO extends userDTO {
  id: string;
  // name: string;
  // email: string;
  // birthDate: string;
}

export interface userDTO {
  name: string;
  email: string;
  password?: string;
  birthDate: string;
}

export interface userCreatedDTO extends userDTO {
  id: string;
}

export interface userUpdatedDTO {
  password?: string;
  email?: string;
}

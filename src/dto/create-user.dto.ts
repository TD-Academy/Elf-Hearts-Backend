import { isStringObject } from 'util/types';

export class CreateUserDto {
  id: string;
  username: string;

  pass: string;

  firstname: string;

  lastname: string;

  email: string;

  phone: string;
}

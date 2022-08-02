import { isStringObject } from 'util/types';

export class CreateUserDto {
  username: string;

  pass: string;

  firstname: string;

  lastname: string;

  email: string;

  phone: string;
}

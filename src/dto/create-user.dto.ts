import { isStringObject } from 'util/types';

export class CreateUserDto {
  id: string;
  username: string;

  password: string;

  firstname: string;

  lastname: string;

  email: string;

  phone: string;
}

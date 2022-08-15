import { isStringObject } from 'util/types';

// changed property names to camelCasing
// username -> userName
// firstname -> firstName
// lastname -> lastName

// changed phoneNumber to phone
// phoneNumber -> phone

// changed pass to password
// pass -> password

// project iin ene property ashiglagdsan buh gazar uurchiltsun shu
// standard ni camelcasing bas phone Number to phone pass to password

export class CreateUserDto {
  id: string;
  userName: string;

  password: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string;
}

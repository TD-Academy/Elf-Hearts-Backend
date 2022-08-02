import { Column, Table, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  userId: string;

  @Column
  username: string;

  @Column
  pass: string;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  email: string;

  @Column
  phone: string;
}

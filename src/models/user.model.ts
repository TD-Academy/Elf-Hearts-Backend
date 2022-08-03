import { Column, Table, Model } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table
export class User extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;

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

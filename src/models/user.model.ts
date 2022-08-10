import { Column, Table, Model } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table
export class User extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;

  @Column
  userName: string;

  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  phone: string;
  @Column({defaultValue: "inactive"})
  status: string;
}

import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { User } from './user.model';

@Table
export class Verification extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;
  @BelongsTo(() => User)
  User: User;
  @ForeignKey(() => User)
  userId: string;

  @Column
  verifyCode: string;
  @Column
  sendDate: Date;

  @Column
  isVerify: Boolean;
  @Column
  usage: string;
}

import { Column, Table, Model, ForeignKey} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { User } from './user.model';

@Table
export class TaskType extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  taskTypeId: string;

  @ForeignKey(() => User)
  userId: string;

  @Column
  taskType: string;

  @Column
  color: string;

  @Column
  score: string;

  @Column
  teamName: string;
}

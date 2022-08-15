import { Column, Table, Model } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table
export class Task extends Model {
  @Column
  userId: string;

  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  taskId: string;

  @Column
  taskType: string;

  @Column
  task: string;

  @Column
  startDate: Date;
  
  @Column
  endDate: Date;

  @Column
  teamName: string;
}

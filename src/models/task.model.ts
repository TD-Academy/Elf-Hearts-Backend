import { Column, Table, Model } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table
export class Task extends Model {
  @Column
  createdUserId: string;

  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;

  @Column
  taskTypeId: string;

  @Column
  task: string;

  @Column
  startDate: Date;
  
  @Column
  endDate: Date;

  @Column
  userId:string;

  @Column
  approveUserId: string
}

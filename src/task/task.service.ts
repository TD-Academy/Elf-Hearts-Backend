import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addTaskDto } from 'src/dto/add-task.dto';
import { Task } from 'src/models/task.model';
import { TaskType } from 'src/models/task-type.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskModel: typeof Task,
    @InjectModel(TaskType) private taskTypeModel: typeof TaskType
  ) {}

async addTask(data: addTaskDto, userId){
    const task= new this.taskModel({
      createdUserId: userId,
      taskTypeId: data.taskType,
      task: data.task,
      startDate: data.startDate,
      endDate: data.endDate,
      userId: data.userId,
      approveUserId: data.approveUserId
    })
    console.log(task)
    task.save();
    return new HttpException('Task added successfully', 200)
  }
  
  async addTaskType(data, userId){
    const newTaskType= new this.taskTypeModel({
    userId: userId,
    taskType: data
    })
    newTaskType.save()
    return newTaskType;
  }
  
  }
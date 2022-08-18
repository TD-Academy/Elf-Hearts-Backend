import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addTaskDto } from 'src/dto/add-task.dto';
import { Task } from 'src/models/task.model';
import { TaskTypeDto } from 'src/dto/task-type.dto';
import { TaskType } from 'src/models/task-type.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskModel: typeof Task,
    @InjectModel(TaskType) private taskTypeModel: typeof TaskType
  ) {}

async addTask(data: addTaskDto, userId){
    const task= new this.taskModel({
      userId: userId,
      taskType: data.taskType,
      task: data.task,
      startDate: data.startDate,
      endDate: data.endDate,
      teamName: data.teamName,
    })
    console.log(task)
    task.save();
    return new HttpException('Task added successfully', 200)
  }
  
  async addTaskType(data: TaskTypeDto, userId){
    const newTaskType= new this.taskTypeModel({
    userId: userId,
    taskType: data.taskType,
    color: data.color,
    score: data.score,
    CompanyId: data.companyId,
    teamId: data.teamId
    })
    newTaskType.save()
    return newTaskType;
  }
  
  }
import { Controller, Post, Body, Get, UseGuards,Request } from '@nestjs/common';
import { addTaskDto } from 'src/dto/add-task.dto';
import { UserAuthGuard } from 'src/guards/user.guard';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

@Post('addTask')
  @UseGuards(UserAuthGuard)
  addTask(@Body() body: addTaskDto, @Request() req){
    return this.TaskService.addTask(body, req.user.id)
  }

  @Post('addTaskType')
  @UseGuards(UserAuthGuard)
  addTaskType(@Body() body: string, @Request() req){
    return this.TaskService.addTaskType(body, req.user.id)

  }
}
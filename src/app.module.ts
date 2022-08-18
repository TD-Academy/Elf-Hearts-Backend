import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskType } from './models/task-type.model';
import { Task } from './models/task.model';
import { User } from './models/user.model';
import { Verification } from './models/verification.model';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '13.215.139.119',
      port: 3306,
      username: 'rtd',
      password: 'Tiny722$',
      database: 'elf_hearts',
      models: [User, Verification, Task, TaskType],
    }),
    SequelizeModule.forFeature([User, Verification, Task, TaskType]),
  ],
  controllers: [AppController, UserController, TaskController],
  providers: [AppService, UserService, TaskService],
})
export class AppModule {}

import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}
}

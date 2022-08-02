import { Controller } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {}
}

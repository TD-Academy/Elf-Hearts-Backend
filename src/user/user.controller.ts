import { UserService } from './user.service';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    console.log('dfgvdg');
    return this.UserService.signUp(createUserDto);
  }

  @Post('signIn')
  signInUser() {}

  // @Delete('delete')
  // deleteUser(@Query() obj){

  // return this.userService.remove(obj.id)
  // }
}

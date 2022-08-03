import { UserService } from './user.service';
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';

// type userBody={ userId: string;
// username : string;
// pass: any;
// firstname: string;
// lastname : string;
// email : string;
// phone : number;}

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.UserService.signUp(createUserDto);
  }

  @Post('signIn')
  signInUser() {}

  // @Delete('delete')
  // deleteUser(@Query() obj){

  // return this.userService.remove(obj.id)
  // }
}

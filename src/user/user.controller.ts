import { UserService } from './user.service';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { OtpUserDto } from 'src/dto/otp-user.dto';
import { UserAuthGuard } from 'src/guards/user.guard';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.UserService.signUp(createUserDto);
  }
  @Post('signIn')
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.UserService.signIn( loginUserDto );
  }
  @Post('approve')
  approveVerify(@Body() otp:OtpUserDto) {
    return this.UserService.approveVerify(otp);
  }

  @Get('users')
  @UseGuards(UserAuthGuard)
  users(){
    return this.UserService.getUsers()
  }



  // @Delete('delete')
  // deleteUser(@Query() obj){

  // return this.userService.remove(obj.id)
  // }
}

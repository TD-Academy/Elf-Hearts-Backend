import { UserService } from './user.service';
import { Controller, Post, Body, Get, UseGuards,Request } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { OtpUserDto } from 'src/dto/otp-user.dto';
import { UserAuthGuard } from 'src/guards/user.guard';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { changePasswordDto } from 'src/dto/change-pass.dto';
import { ForgotPasswordDto, RequestPasswordDto } from 'src/dto/forgot-password.dto';


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

  @Post('changePass')
  @UseGuards(UserAuthGuard)
  changePass(@Body() body: changePasswordDto, @Request() req){
    return this.UserService.passwordChange(body,req.user.id)
  }

  @Post('password/request')
  forgotPass(@Body() body: RequestPasswordDto){
    return this.UserService.requestPass(body)
  }

  @Post('password/accept')
  acceptPass(@Body() otp: OtpUserDto){
    return this.UserService.acceptPass(otp)
  }

  @Post('password/changed')
  changedPass(@Body() body: ForgotPasswordDto){
    return this.UserService.changedPass(body)
  }
}

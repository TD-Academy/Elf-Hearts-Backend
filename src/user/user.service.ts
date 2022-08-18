import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { OtpUserDto } from 'src/dto/otp-user.dto';
import { User } from 'src/models/user.model';
import { CreatedAt, Sequelize } from 'sequelize-typescript';
import { Verification } from 'src/models/verification.model';
import { sign, verify } from 'jsonwebtoken';
import {access } from 'fs';
import axios from 'axios';
import { LoginUserDto } from 'src/dto/login-user.dto';

// username -> userName
// phoneNumber -> phone
// pass -> password


export type UserFind={
  userName?: string;
  phone?: string;
  email?: string;
  id?: string;
}

export type UserCheck={
  userName?: string;
  phone?: string;
}


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Verification) private verifyModel: typeof Verification,
  ) {}

  async signIn(data: LoginUserDto) {
    const user = await this.userModel.findOne({
      where: {
        userName: data.userName,
        password: data.password,
      },
    });

    if (user) {
      const { access_token, refresh_token } = this.TokenGenerate(user.id, );
      const{}=this.verifyModel.findOne({where:{isVerify:true}});

      // made it so that when user logs in it returns the user id and userName too
      // id and userName needed to store it in local storage

      return {
        access_token,
        refresh_token,
        user: {
          id: user.id,
          userName: user.userName
        }
      };}
    throw new UnauthorizedException;
  }

  getUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  TokenGenerate(id: string, expiresIn: string = '24h') {
    const access_token = sign({ userId: id }, 'secret', { expiresIn: '15m' });
    const refresh_token = sign({ userId: id }, 'secret' + '_refresh', {
      expiresIn: expiresIn || '24h',
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async findOne ({id, userName, phone, email}:UserFind,
    select?: keyof User| any){
      if(!id && !userName && !phone && !email) throw new HttpException('EMPTY_FIELD', 400);
      let findOptions: any={};
      if (phone) findOptions.phone= phone;
      if (userName) findOptions.userName= userName;
      if (email) findOptions.email= email;
      if (id) findOptions.id= id;

      const user= await this.userModel.findOne({
        ...findOptions,
        status:{
          $in: status.split(' '),
        }
      })
      return user;
    }

 async signUp(data: CreateUserDto) {
    const newUser = new this.userModel(data);

    let checkedUser= await this.checkUser({userName: data.userName, phone: data.phone});
    if (checkedUser= true){

    newUser.save();
    let code = Math.floor(100000 + Math.random() * 900000);
    const newVerify = new this.verifyModel({
      userId: newUser.id,
      otp: code,
      sendDate: new Date(),
      usage: 'SignUp',
      isVerify: false,
    });
    newVerify.save();
    this.sendMessage(data.phone, code)
    return newUser;
  }
  }

  sendMessage(phone, otp){
  axios({
    method: 'post',
    url: 'http://18.167.46.29:5010/sms/messagePro',
    data: {
      to: phone,
      text: 'Your verification code is ' + otp,
      systemId: 'DA22',
      countryCode:'+976',
    }
  })}

  async approveVerify(data: OtpUserDto) {

    let ver = await this.verifyModel.findOne({
      where:{userId:data.id}, order:[["createdAt", "DESC"]]});

    if (ver.otp == data.verifyCode && !ver.isVerify) {
      this.userModel
        .update({ status: 'Active' }, { where: { id: ver.userId } })
      ver.isVerify = true;
      ver.save();
    } else {
      return 'Wrong OTP code';
    }
  }


async checkUser({userName, phone }: UserCheck): Promise<any>{
  if(!!phone){
    const checkPhone= await this.userModel.findOne({where:{
      phone: phone
    }});
    if(!checkPhone) return true;
    throw new HttpException('PHONE_ALREADY_EXISTS', 400);
  }

  if(!!userName){
    const checkPhone= await this.userModel.findOne({where:
      {userName: userName}});
    if(!checkPhone) return true;
    throw new HttpException('PHONE_ALREADY_EXISTS', 400);
  }
  return true;
}


}

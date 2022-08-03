import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/models/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  //   async signIn(createuserDto: CreateUserDto) {
  //     const user = await this.userModel.findOne({
  //       where: {
  //         username: createuserDto.username,
  //         pass: createuserDto.pass,
  //       },
  //     });
  //     if (user) {
  //       return "You've logged in";
  //     }

  //     return 'User Not Found';
  //   }

  //   getUsers(): Promise<User[]> {
  //     return this.userModel.findAll();
  //   }

  async SignUp(createuserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: {
        username: createuserDto.username,
        email: createuserDto.email,
        phone: createuserDto.phone,
      },
    });
    if (user) {
      return 'Username is already in use';
    } else {
      let User = new this.userModel(createuserDto);
      User.save();
      return 'signed up successfully';
    }
  }

  signUp(data: CreateUserDto) {
    const newUser = new this.userModel({
      username: data.username,
      pass: data.pass,
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
    });
    console.log('fdsfmszjkdf');
    console.log(newUser);
    newUser.save();
    return newUser;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  signUp(CreateUserDto: CreateUserDto) {
    const newData = new this.userModel();
  }
}

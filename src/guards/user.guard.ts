import { ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

// import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserAuthGuard {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    try {
      let req = context.switchToHttp().getRequest();

      const headers = context.switchToHttp().getRequest().headers;

      if (!headers.authorization) throw 'Header error';

      const [prefix, token] = headers.authorization.split(' ');
      if (prefix !== 'Bearer') throw 'Header error';

      const decode = verify(token, 'secret') ;
      console.log(decode)
      if (!decode) throw 'Token undefiened';
 

      // const user = await this.userService.finOne({ id: decode.userId });
      // if (!user) throw 'User not found';

      req.user = {
        id: decode.userId,
        logged: Date.now(),
      };

      return true;
    } catch (e) {
      throw new HttpException('UNAUTHORIZED_ERROR', 401);
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { publicDecrypt } from 'crypto';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User is already exist!', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private generateToken = (user: User) => {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  };

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passwordIsMatched = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordIsMatched) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid email or password!' });
  }
}

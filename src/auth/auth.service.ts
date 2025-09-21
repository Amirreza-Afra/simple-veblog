import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/req/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/req/login.dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.userService.createUser(dto);

      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      throw error;
    }
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) return null;

    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      return matched;
    }

    return null;
  }
  //   async login(user: LoginUserDto) {

  //     }
}

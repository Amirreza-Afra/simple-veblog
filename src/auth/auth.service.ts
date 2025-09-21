import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/req/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/req/login.dto';

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

  async login(dto: LoginUserDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.userService.getUserByUsername(dto.username);

      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است');
      }

      const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      throw error;
    }
  }
}

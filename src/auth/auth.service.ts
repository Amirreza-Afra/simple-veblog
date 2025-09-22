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

  async getToken(
    user: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payloadAc = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const payloadRe = {
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payloadAc, {
      secret: '777',
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payloadRe, {
      secret: '7777',
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async setCurrentrefreshToken(refreshToken: string, userId: number) {
    if (!refreshToken) {
      throw new Error('refreshToken is required for hashing');
    }
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.userService.setRefreshToken(hashed, userId);
  }

  async removeRefreshToken(userId: number) {
    await this.userService.setRefreshToken(null, userId);
  }

  async registerUser(
    dto: RegisterUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const user = await this.userService.createUser(dto);

      const tokens = await this.getToken(user);

      await this.setCurrentrefreshToken(tokens.refreshToken, user.id);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(
    dto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const user = await this.userService.getUserByUsername(dto.username);

      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است');
      }

      const tokens = await this.getToken(user);
      await this.setCurrentrefreshToken(tokens.refreshToken, user.id);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: '7777',
      });

      if (payload.sub !== userId) {
        throw new UnauthorizedException('شناسه کاربر نامعتبر');
      }

      const user = await this.userService.getUserById(userId);
      if (!user || !user.tokenHash) {
        throw new UnauthorizedException('دسترسی نامعتبر');
      }

      const isMatch = await bcrypt.compare(refreshToken, user.tokenHash);
      if (!isMatch) {
        throw new UnauthorizedException(
          'refreshToken با هش ذخیره شده مطابقت ندارد',
        );
      }

      const tokens = await this.getToken(user);
      await this.setCurrentrefreshToken(tokens.refreshToken, user.id);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}

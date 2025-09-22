import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/req/register.dto';
import { LoginUserDto } from './dto/req/login.dto';
import { Public } from './decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterUserDto) :Promise <{accessToken : string}>{
    return this.authService.registerUser(dto);
  }


  @Public()
  @Post('login')
  async login(@Body() dto : LoginUserDto) :Promise <{accessToken : string}>{
    return this.authService.login(dto);
  }
}

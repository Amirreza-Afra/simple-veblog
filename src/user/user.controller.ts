import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/req/create.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from './enum/user.role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //-----------create user
  @ApiOperation({ summary: 'create user' })
  @ApiOkResponse()
  @ApiConflictResponse()
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('register')
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }

  //-----------get all users
  @ApiOperation({ summary: 'get all users' })
  @ApiOkResponse()
   @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'دسترسی غیرمجاز: فقط ادمین‌ها مجاز هستند' })
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAll(): Promise<{ users: User[] }> {
    return this.userService.getAllUsers();
  }

  @Get(':username')
  async getOne(@Param('username') username : string) : Promise<User>{
    return this.userService.getUserByUsername(username)
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/req/create.dto';
import { ApiConflictResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  //-----------create user
  @ApiOperation({ summary: 'create user' })
  @ApiOkResponse()
  @ApiConflictResponse()
  @Post('register')
  async create(@Body() dto: CreateUserDto) : Promise<void> {
    return this.userService.createUser(dto);
  }

  @Get()
  async getall() : Promise<{users : User[]}>{
    return this.userService.getAllUsers();
  }


}

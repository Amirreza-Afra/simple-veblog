import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/req/create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRep: Repository<User>,
  ) {}

  //-----------create user
  async createUser(dto: CreateUserDto): Promise<void> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(dto.password, salt);

      const user = this.userRep.create({ ...dto, password: hashPassword });

      await this.userRep.save(user);
    } catch (error) {
      console.error(error);
      if (error.errno === 1062)
        throw new ConflictException('یوزنیم دیگری با این اسم وجود دارد');
    }
  }

  async getAllUsers(): Promise<{users : User[]}>{
    const users = await this.userRep.find();
    return {users : users}
  }

}

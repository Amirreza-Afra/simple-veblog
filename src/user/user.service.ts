import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/req/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRep: Repository<User>,
  ) {}


 
  //-----------create user
  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(dto.password, salt);

      const user = this.userRep.create({ ...dto, password: hashPassword });

      return await this.userRep.save(user);
    } catch (error) {
      console.error(error);
      if (error.errno === 1062)
        throw new ConflictException('یوزنیم دیگری با این اسم وجود دارد');
      throw new InternalServerErrorException('خطایی رخ داده است');
    }
  }

  //-----------get all users
  async getAllUsers(): Promise<{ users: User[] }> {
    const users = await this.userRep.find();
    return { users: users };
  }

  //-------------get users by username
  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRep.findOne({ where: { username: username } });
    

    if (!user)  throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است');

    return user;
  }

  async getUserById(id : number): Promise<User>{
    const user = await this.userRep.findOne({where : {id : id}});
    if (!user) throw new NotFoundException()

      return user;
  }


  async setRefreshToken(refreshToken: string | null, id : number){
    await this.userRep.update({id : id } ,{tokenHash : refreshToken})
  }
}

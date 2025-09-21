import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/user/enum/user.role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Afra', description: 'username for users' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'پسورد باید حداقل 6 کاراکتر باشد' })
  password: string;

  @ApiProperty({example : 'admin' , default : 'user'})
  @IsOptional()
  @IsEnum(UserRole, { message: 'نقش باید یکی از دو کاربر ادمین یا یوزر باشد' })
  role?: UserRole;
}

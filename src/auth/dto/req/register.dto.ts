import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/user/enum/user.role.enum';

export class RegisterUserDto {
  @ApiProperty({ example: 'Afra', description: 'username for users' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(50)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'پسورد باید حداقل 6 کاراکتر باشد' })
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'نقش باید یکی از دو کاربر ادمین یا یوزر باشد' })
  role?: UserRole;
}

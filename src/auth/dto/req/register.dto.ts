import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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

}

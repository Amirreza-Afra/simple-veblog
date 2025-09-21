import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
  
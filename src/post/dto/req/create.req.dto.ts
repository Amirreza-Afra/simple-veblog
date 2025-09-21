import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @ApiProperty({ example: 'hi', description: 'name for post title' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;
  
  @ApiProperty({ example: 'this is a content of post', description: 'content of post' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;
  
  @ApiProperty({ example: 'amir', description: 'name for post author' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  author: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @ApiProperty({ example: 'hi', description: 'name for post title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'this is a content of post', description: 'content of post' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 'amir', description: 'name for post author' })
  @IsString()
  @IsNotEmpty()
  author: string;
}

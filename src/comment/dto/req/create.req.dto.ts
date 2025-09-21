import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @ApiProperty({
    example: 'hi this is not good',
    description: 'text of comments',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 'rreza', description: 'name of comments author' })
  @IsString()
  @IsNotEmpty()
  author: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { CreateDto } from '../req/create.req.dto';

export class PostResDto extends CreateDto {
  @ApiProperty({ description: 'id of Posts' })
  id: number;
}

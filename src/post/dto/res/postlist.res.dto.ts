import { ApiProperty } from "@nestjs/swagger";
import { CreateDto } from "../req/create.req.dto";

export class PostListResDto{
@ApiProperty({ type: [CreateDto], description: 'List of posts' })
posts : CreateDto[];
}
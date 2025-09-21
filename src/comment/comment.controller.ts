import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateDto } from './dto/req/create.req.dto';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService : CommentService){}

    @Post(':postId')
    async createComment(@Param('postId' , ParseIntPipe) postid : number ,@Body() dto: CreateDto) {
        return this.commentService.createComment(postid , dto)
    }
}

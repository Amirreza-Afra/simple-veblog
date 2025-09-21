import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateDto } from './dto/req/create.req.dto';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  async createComment(postId: number, dto: CreateDto): Promise<void> {
    try {
      const post = await this.postService.findById(postId);

      const comment = this.commentRepo.create({ post, ...dto });
      await this.commentRepo.save(comment);
        
    } catch (error) {
      this.logger.error('Failed to create comment', error.stack);
      throw error;
    }
  }
}

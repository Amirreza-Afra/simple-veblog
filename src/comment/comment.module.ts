import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PostModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}

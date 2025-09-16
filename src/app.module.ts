import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PostModule, CommentModule, TypeOrmModule.forRoot({
    type:'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Amirreza.1381711',
    database: 'nestdb',
    entities: [Post,Comment],
    synchronize: true,
  })  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

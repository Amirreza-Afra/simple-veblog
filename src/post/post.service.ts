import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entitiy';
import { CreateDto } from './dto/req/create.req.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdatePostDto } from './dto/req/update.req.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    @InjectRepository(Post)
    private readonly postRep: Repository<Post>,
  ) {}

  //------------update posts
  async createPost(dto: CreateDto): Promise<Post> {
    try {
      this.logger.log(`Creating post with title: ${dto.title}`);

      let save = this.postRep.create(dto);

      return await this.postRep.save(save);
    } catch (error) {
      this.logger.error(`Failed to create post: ${error.message}`, error.stack);
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Post with this title already exists');
      }
      throw new InternalServerErrorException('Failed to created post');
    }
  }

  //------------update post by id
  async updateById(id: number, dto: UpdatePostDto): Promise<void> {
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException('Update data cannot be empty');
    }

    const post = await this.postRep.update(id, dto);
    if (post.affected === 0) throw new NotFoundException(`no post found with id ${id} for update`);
  }

  //------------get by id
  async findById(id: number): Promise<Post> {
    try {
      this.logger.log(`finding post by id:${id}`);
      const find = await this.postRep.findOne({
        where: { id },
        relations: ['comments'],
      });

      if (!find) {
        throw new NotFoundException(`no post found with id : ${id}`);
      }

      return find;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to create post: ${error.message}`, error.stack);
      throw new InternalServerErrorException('failed to get', error);
    }
  }

  //-------------get all
  async findAll(): Promise<{ posts: Post[] }> {
    try {
      this.logger.log(`getting posts`);
      const posts = await this.postRep.find();
      return { posts: posts };
    } catch (error) {
      this.logger.error(`Failed to create post: ${error.message}`, error.stack);

      throw new InternalServerErrorException('failed to get all', error);
    }
  }

  //------------delete by id
  async deletById(id: number): Promise<void> {
    try {
      const post = await this.postRep.delete(id);
      if (post.affected === 0) {
        throw new NotFoundException(`post with id ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('cant deleted', error);
    }
  }
  //   async findAll() : Promise<{ pod: Array<{ author: string; content: string }> }>{
  //     try {
  //       this.logger.log(`getting posts`);
  //       const posts: Post[] =  await this.postRep.find();
  //       const pod  = posts.map(post => ({"author" : post.author,
  //         "content" : post.content
  //       } ));
  //       return {pod}
  //     } catch (error) {
  //       this.logger.error(`Failed to create post: ${error.message}`, error.stack);

  //       throw new InternalServerErrorException('failed to get all', error);
  //     }
  //   }
}

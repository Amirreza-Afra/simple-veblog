import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entitiy';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRep : Repository<Post>){}


    async createPost() : Promise<void>{

        
    }


}

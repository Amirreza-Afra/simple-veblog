import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreateDto } from './dto/req/create.req.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateResponseDto } from './dto/res/create.res.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}



  
  //-------------create posts
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreateDto })
  @ApiCreatedResponse({
    description: 'Post created successfully',
    type: CreateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiResponse({
    status: 409,
    description: 'Post with this title already exists',
  })
  @Post()
  async createPost(@Body() dto: CreateDto) {
    return this.postService.createPost(dto);
  }

  
  //-------------get all 
  @Get()
  async getAllBy() {
    return this.postService.findAll();
  }

  //------------get by id 
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findById(id);
  }



  @Delete(':id')
  async deletById(@Param('id', ParseIntPipe) id: number){
    return this.postService.deletById(id);
  }

}

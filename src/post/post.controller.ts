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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { PostResDto } from './dto/res/post.res.dto';
import { PostListResDto } from './dto/res/postlist.res.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //-------------create posts
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreateDto })
  @ApiCreatedResponse({
    description: 'Post created successfully',
    type: PostResDto,
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

  //------------get by id
  @ApiOperation({ summary: 'get post by id' })
  @ApiOkResponse({description : 'post retuend' , type : PostResDto})
  @ApiNotFoundResponse({ description: `no post found with id` })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findById(id);
  }

  //-------------get all
  @ApiOperation({ summary: 'get all post' })
  @ApiOkResponse({ description: 'all post returned', type: PostListResDto })
  @Get()
  async getAllBy() {
    return this.postService.findAll();
  }

  //------------delete by id
  @ApiOperation({ summary: 'delete post by id' })
  @ApiOkResponse({ description: 'succesfully deleted' })
  @ApiNotFoundResponse({description : `post with :id not found`})
  @Delete(':id')
  async deletById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletById(id);
  }
}

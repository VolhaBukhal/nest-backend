import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postModel: typeof Post,
    private filesService: FilesService,
  ) {}

  async createPost(dto: CreatePostDto, image) {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postModel.create({ ...dto, image: fileName });
    return post;
  }
}

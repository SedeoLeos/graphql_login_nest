import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { Post } from './entities/post.entity';

@Module({
  imports:[
    // TypeOrmModule.forFeature([Post])
  ],
  providers: [PostResolver, PostService]
})
export class PostModule {}

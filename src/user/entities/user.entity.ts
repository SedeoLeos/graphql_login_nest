import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {
  static staticId = 0;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: false })
  email: string;
  
  @Field({ nullable: false })
  password: string;

  @Field(type => [Post])
  posts: Post[];
  constructor(partial: Partial<User>) {
    this.id = ++User.staticId;
    this.firstName = partial.firstName;
    this.lastName = partial.lastName;
    this.email = partial.email;
    this.password = partial.password;
  }

}


import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  describe: string;

  createAt?: Date
  updateAt?: Date

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

}



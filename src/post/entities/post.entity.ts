import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(()=>String)
  name: string;

  @Field(()=>String)
  describe: string;

  createAt?: Date
  updateAt?: Date

}



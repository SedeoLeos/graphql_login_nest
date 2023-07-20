import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'Example field (placeholder)',nullable:true })
  Refresh_Duretion: string;
  @Field(() => String, { description: 'Example field (placeholder)',nullable:true })
  Access_Token: string;
  @Field(() => String, { description: 'Example field (placeholder)',nullable:true })
  Scope: string;
  @Field(() => String, { description: 'Example field (placeholder)',nullable:true })
  Refresh_Token: string;
  @Field(() => String, { description: 'Example field (placeholder)',nullable:true })
  Access_Duretion: string;
}

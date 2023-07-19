import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  firstName: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  lastName: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  password: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;
}

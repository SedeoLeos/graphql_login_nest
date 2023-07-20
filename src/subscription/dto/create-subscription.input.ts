import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubscriptionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

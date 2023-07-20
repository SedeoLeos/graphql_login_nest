import { CreateSubscriptionInput } from './create-subscription.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubscriptionInput extends PartialType(CreateSubscriptionInput) {
  @Field(() => Int)
  id: number;
}

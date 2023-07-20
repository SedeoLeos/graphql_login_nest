import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Mutation(() => Subscription)
  createSubscription(@Args('createSubscriptionInput') createSubscriptionInput: CreateSubscriptionInput) {
    return this.subscriptionService.create(createSubscriptionInput);
  }

  @Query(() => [Subscription], { name: 'subscription' })
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Query(() => Subscription, { name: 'subscription' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subscriptionService.findOne(id);
  }

  @Mutation(() => Subscription)
  updateSubscription(@Args('updateSubscriptionInput') updateSubscriptionInput: UpdateSubscriptionInput) {
    return this.subscriptionService.update(updateSubscriptionInput.id, updateSubscriptionInput);
  }

  @Mutation(() => Subscription)
  removeSubscription(@Args('id', { type: () => Int }) id: number) {
    return this.subscriptionService.remove(id);
  }
}

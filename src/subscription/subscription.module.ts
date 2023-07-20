import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionResolver } from './subscription.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [SubscriptionResolver, SubscriptionService]
})
export class SubscriptionModule { }

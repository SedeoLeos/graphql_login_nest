import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionResolver } from './subscription.resolver';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionResolver', () => {
  let resolver: SubscriptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionResolver, SubscriptionService],
    }).compile();

    resolver = module.get<SubscriptionResolver>(SubscriptionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

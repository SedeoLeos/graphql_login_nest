import { Injectable } from '@nestjs/common';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';

@Injectable()
export class SubscriptionService {
  create(createSubscriptionInput: CreateSubscriptionInput) {
    return 'This action adds a new subscription';
  }

  findAll() {
    return `This action returns all subscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionInput: UpdateSubscriptionInput) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field(() => String, { description: 'smatsoula19@gmail.com ' })
  email: string;
  @Field(() => String, { description: '**********' })
  password: string
}

@InputType()
export class RegisterAuthInput {
  @Field(() => String, { description: 'smatsoula19@gmail.com ' })
  email: string;
  @Field(() => String, { description: '**********' })
  password: string
}

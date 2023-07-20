import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Subscription {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.mysubscription)
  auther: User

  @ManyToMany(() => User, (user) => user.subscriptions)
  subscribers: User[]
}




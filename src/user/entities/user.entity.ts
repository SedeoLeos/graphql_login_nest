import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Refresh } from 'src/auth/entities/refresh.entity';
import { Post } from 'src/post/entities/post.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  firstName?: string;

  @Field({ nullable: true })
  @Column()
  lastName?: string;

  @Field({ nullable: false })
  @Column()
  email: string;

  @Field({ nullable: false })
  @Column()
  password: string;

  @Field(type => [Post])
  @OneToMany(() => Post, posts => posts.user)
  posts: Post[];

  @Field(type => [Refresh])
  @OneToMany(() => Refresh, (refresh) => refresh.user)
  refreshs: Refresh[]

  @OneToOne(()=>Subscription,(sub)=>sub.auther)
  mysubscription:Subscription

  @ManyToMany(() => Subscription, (influenceur) => influenceur.subscribers)
  subscriptions: Subscription





  // constructor(partial: Partial<User>) {
  //   if (partial) {
  //     this.firstName = partial.firstName;
  //     this.lastName = partial.lastName;
  //     this.email = partial.email;
  //     this.password = partial.password;
  //   }
  // }

}


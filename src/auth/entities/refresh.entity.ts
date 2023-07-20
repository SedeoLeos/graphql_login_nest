import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { sign } from 'jsonwebtoken';
import { Collection, Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity()
export class Refresh {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>User,user=>user.refreshs)
  user:User;
  @Column()
  userAgent:string

  public get sign(): string {
    console.log("la ici ",process.env.REFRESH_SECRET)
    return sign({ id: this.id, userAgent: this.userAgent, user: { email: this.user.email, userId: this.user.id } }, process.env.REFRESH_SECRET, { expiresIn: '30d' });
}
}

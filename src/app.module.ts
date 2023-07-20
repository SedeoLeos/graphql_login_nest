import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      // include:[PostModule],
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': true
      },
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // definitions:{
      //   path:join(process.cwd(), 'src/schema.ts'),
      // }

    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'file.db',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostModule, 
    UserModule, SubscriptionModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }




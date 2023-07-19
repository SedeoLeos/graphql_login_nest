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
@Module({
  imports: [ 
    GraphQLModule.forRoot({
      // include:[PostModule],
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // definitions:{
      //   path:join(process.cwd(), 'src/schema.ts'),
      // }
      
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'file.db',
      entities: [],
      autoLoadEntities:true,
      synchronize: true,
    }),
    PostModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}



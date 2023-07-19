import { Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver(of => String)
export class AppResolver {
    constructor(
        private appService: AppService
    ) { }

    @Query(returns => String)
    index(): string {
        return this.appService.getHello()
    }
}

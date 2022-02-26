import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffe/coffees.module';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
    imports: [
        DatabaseModule.register({
            type: 'postgres',
            host: 'localhost',
            password: 'password',
            port: 5432
        }),
        CoffeesModule
    ],
    providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}

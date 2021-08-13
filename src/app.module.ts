import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeController } from './coffe/coffe.controller';
import { CoffeService } from './coffe/coffe.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  controllers: [AppController, CoffeController],
  providers: [AppService, CoffeService],
})
export class AppModule {}

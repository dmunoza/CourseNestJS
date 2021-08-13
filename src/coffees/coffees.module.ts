import { Module } from '@nestjs/common';
import { CoffeController } from 'src/coffe/coffe.controller';
import { CoffeService } from 'src/coffe/coffe.service';

@Module({controllers: [CoffeController], providers: [CoffeService]})
export class CoffeesModule {}

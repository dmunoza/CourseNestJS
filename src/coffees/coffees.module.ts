import { flatten, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeController } from 'src/coffe/coffe.controller';
import { CoffeService } from 'src/coffe/coffe.service';
import { Coffee } from 'src/coffe/entities/coffe.entity';
import { Flavor } from 'src/coffe/entities/flavor.entity';
import {Event} from '../events/entities/event.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeController], 
    providers: [CoffeService]})
export class CoffeesModule {}

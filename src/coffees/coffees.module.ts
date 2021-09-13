import { flatten, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeController } from 'src/coffe/coffe.controller';
import { CoffeService } from 'src/coffe/coffe.service';
import { Coffee } from 'src/coffe/entities/coffe.entity';
import { Flavor } from 'src/coffe/entities/flavor.entity';
import { COFFEE_BRANDS } from 'src/coffees.constants';
import {Event} from '../events/entities/event.entity'

export class MockCoffeesServie{}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeController], 
    providers: [
        CoffeService,
        {
            provide: COFFEE_BRANDS, // se ocupa como token, permite validar desde coffeservice la clase que se ocupara.
            useValue: ['buddy brew', 'nescafe'], //cada vez que se injecte coffeService, se ocupara la class MockCoffeesServie.
        },
    ],
    exports: [CoffeService]
})
export class CoffeesModule {}

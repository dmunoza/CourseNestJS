import { flatten, Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeController } from 'src/coffe/coffe.controller';
import { CoffeService } from 'src/coffe/coffe.service';
import { Coffee } from 'src/coffe/entities/coffe.entity';
import { Flavor } from 'src/coffe/entities/flavor.entity';
import { COFFEE_BRANDS } from 'src/coffees.constants';
import {Event} from '../events/entities/event.entity'

class ConfigService{}
class DevelopmentConfigService{}
class ProductionConfigService{}

@Injectable()
export class CoffeeBrandsFactory{
    create(){
        return['buddy brew', 'nescafe']
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeController], 
    providers: [
        CoffeService,
        CoffeeBrandsFactory,
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService,
        },
        {
            provide: COFFEE_BRANDS, // se ocupa como token, permite validar desde coffeservice la clase que se ocupara.
            useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
            inject: [CoffeeBrandsFactory],
        },
    ],
    exports: [CoffeService]
})
export class CoffeesModule {}

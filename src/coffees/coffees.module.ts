import { flatten, Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeController } from 'src/coffe/coffe.controller';
import { CoffeService } from 'src/coffe/coffe.service';
import { Coffee } from 'src/coffe/entities/coffe.entity';
import { Flavor } from 'src/coffe/entities/flavor.entity';
import { COFFEE_BRANDS } from 'src/coffees.constants';
import { Connection } from 'typeorm';
import {Event} from '../events/entities/event.entity';

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
        {
            provide: COFFEE_BRANDS, // se ocupa como token, permite validar desde coffeservice la clase que se ocupara.
            useFactory: async (connection: Connection): Promise<string[]> => {
                // const coffeeBrands = await connection.query('SELECT * ...');
                const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
                console.log('[!] Async Factory')
                return coffeeBrands
            },
            inject: [Connection],
        },
    ],
    exports: [CoffeService]
})
export class CoffeesModule {}

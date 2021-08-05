import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffe.entity';

@Injectable()
export class CoffeService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Catalina Ortiz',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'Vainilla']
        }
    ]
    findAll(){
        return this.coffees
    }

    findOne(id: string){
        return this.coffees.find(e => e.id === +id);
    }

    create(createCoffeDto: any){
        this.coffees.push(createCoffeDto);
    }

    update(id: string, updateCoffeeDto: any){
        const existingCoffee = this.findOne(id)
        if(existingCoffee){
            return 'update'
        }
    }

    remove(id: string){
        const coffeIndex = this.coffees.findIndex(item => item.id === +id)
        if(coffeIndex >= 0){
            this.coffees.splice(coffeIndex, 1)
        }
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffe.entity';

@Injectable()
export class CoffeService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeRepository: Repository<Coffee>
    ){}

    findAll(){
        return this.coffeRepository.find();
    }

    async findOne(id: string){
        const coffe = await this.coffeRepository.findOne(id);
        if(!coffe){
            throw new NotFoundException(`Coffe #${id} not found`)
        }
        return coffe
    }

    create(createCoffeDto: CreateCoffeeDto){
        const coffe = this.coffeRepository.create(createCoffeDto);
        return this.coffeRepository.save(coffe);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto){
        const coffe = await this.coffeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
        })
        if(!coffe){
            throw new NotFoundException(`Coffe #${id} not found`)
        }
        return this.coffeRepository.save(coffe)
    }

    async remove(id: string){
        const coffe = await this.findOne(id)
        return this.coffeRepository.remove(coffe)
    }
}

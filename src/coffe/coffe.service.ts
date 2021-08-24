import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';
import {Event} from '../events/entities/event.entity'

@Injectable()
export class CoffeService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection
    ){}

    findAll(){
        return this.coffeRepository.find({
            relations: ['flavors']
        });
    }
    findAllPagination(paginationQuery: PaginationQueryDto){
        const {limit, offset} = paginationQuery
        return this.coffeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string){
        const coffe = await this.coffeRepository.findOne(id, {
            relations: ['flavors']
        });
        if(!coffe){
            throw new NotFoundException(`Coffe #${id} not found`)
        }
        return coffe
    }

    async create(createCoffeDto: CreateCoffeeDto){
        const flavors = await Promise.all(
            createCoffeDto.flavors.map(name => this.preloadFlavorByName(name))
        )
        const coffe = this.coffeRepository.create({
            ...createCoffeDto,
            flavors
        });
        return this.coffeRepository.save(coffe);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto){
        const flavors = updateCoffeeDto.flavors && (await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        ))    
        const coffe = await this.coffeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors,
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

    private async preloadFlavorByName(name: string): Promise<Flavor> { //find flavor and if exist, return else save.
        const existingFlavor = await this.flavorRepository.findOne({name}); 
        if(existingFlavor){
            return existingFlavor
        }
        return this.flavorRepository.create({name})
    }

    async recommendCoffe(coffee: Coffee){
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            coffee.recommendations++

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally{
            await queryRunner.release()
        }
    }
}

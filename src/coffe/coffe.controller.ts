import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeService } from './coffe.service'
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffe')
export class CoffeController {
    constructor(private readonly coffeService: CoffeService) {}

    @Get()
    findAll(){
        return this.coffeService.findAll();
    }
    @Get('pagination')
    findAllPagination(@Query() paginationQuery: PaginationQueryDto){
        return this.coffeService.findAllPagination(paginationQuery);
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.coffeService.findOne(id);
    }
    @Post()
    //@HttpCode(HttpStatus.CONFLICT) //send status return
    create(@Body() createCoffeeDto: CreateCoffeeDto){ // add property i need show, example: 'name' and body returns only name
        return this.coffeService.create(createCoffeeDto);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){
        return this.coffeService.update(id, updateCoffeeDto)
    }
    
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.coffeService.remove(id)
    }
}


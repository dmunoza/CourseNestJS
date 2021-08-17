import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeController } from 'src/coffe/coffe.controller';
import { CoffeService } from 'src/coffe/coffe.service';
import { Coffee } from 'src/coffe/entities/coffe.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee])],
    controllers: [CoffeController], 
    providers: [CoffeService]})
export class CoffeesModule {}

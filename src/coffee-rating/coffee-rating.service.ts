import { Injectable } from '@nestjs/common';
import { CoffeService } from 'src/coffe/coffe.service';

@Injectable()
export class CoffeeRatingService {
    constructor(private readonly coffeService: CoffeService){}
}

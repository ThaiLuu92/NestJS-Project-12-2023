import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('/api/v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.paymentsService.create(body);
  }

  @Get('/all')
  async findAll(
  ) {
    console.log(111111);
    console.log(await this.paymentsService.findAll());
    
    return await this.paymentsService.findAll();
  }


  @Get()
  async findAllPaginatiton(

    @Query('user_name') query: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    console.log(22222222);

    return this.paymentsService.findAllPaginatiton(query,page ,pageSize);
  }

  

  @Get('/user-payments/:id')
  async findUserPaymentByUserId(@Param('id') id: string) {
    return this.paymentsService.findUserPaymentByUserId(id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { removeAccents } from 'src/utils/common.util';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentView } from './entities/payment-view.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepositoryTypeORM: Repository<PaymentEntity>,
    @InjectRepository(PaymentView)
    private readonly paymentViewRepositoryTypeORM: Repository<PaymentView>,
  ) {}
  // 1.1
  async create(data: CreatePaymentDto): Promise<PaymentEntity> {
    try {
      const category = this.paymentRepositoryTypeORM.create(data);
      return await this.paymentRepositoryTypeORM.save(category);
    } catch (error) {
      throw error;
    }
  }
  // 1.2
  async findByUserIdAndCourseId(user_id: string, courses_id: string) {
    return await this.paymentRepositoryTypeORM.findOne({
      where: { user_id, courses_id },
    });
  }

  // 2
  async findAllPaginatiton(query: string, page: number, pageSize: number) {
    const [payments, total] = await this.paymentViewRepositoryTypeORM.findAndCount({
      where: [{ user_name: Like(`%${query}%`) }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: payments,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
  async findAll() {
    return await this.paymentViewRepositoryTypeORM.find({
     });
   }
 
  // 3
  async findOne(id: string) {
    try {
      const payment = await this.paymentViewRepositoryTypeORM.findOne({
        where: { id },
      });
      return payment;
    } catch (error) {
      throw error;
    }
  }
  // 4
  async findUserPaymentByUserId(user_id: string){
    return await this.paymentViewRepositoryTypeORM.find({
      where: { user_id },
    });
  }
}


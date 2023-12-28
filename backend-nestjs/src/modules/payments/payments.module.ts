import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentView } from './entities/payment-view.entity';
import { PaymentRepository } from './payments.repository';
import { CourseUserRepository } from '../courses-users/courese-users.repository';
import { LessonRepository } from '../lessons/lessons.repository';
import { LessonUserRepository } from '../lessons-users/lessons-users.repository';
import { CourseUserEntity } from '../courses-users/entities/courses-users.entity';
import { LessonEntity } from '../lessons/entities/lessons.entity';
import { LessonUserEntity } from '../lessons-users/entities/lessons-users.entity';
import { CourseUserView } from '../courses-users/entities/courses-users-view.entity';
import { EmailService } from 'src/utils/mail/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      PaymentView,
      CourseUserEntity,
      CourseUserView,
      LessonEntity,
      LessonUserEntity,
    ]),
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentRepository,
    CourseUserRepository,
    LessonRepository,
    LessonUserRepository,
    EmailService
  ],
})
export class PaymentsModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/categories/category.module';
import { CourseModule } from './modules/courses/course.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './modules/categories/entities/categories.entity';
import { UserEntity } from './modules/auth/entities/auth.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './utils/upload/upload.module';
import { CourseEntity } from './modules/courses/entities/course.entity';
import { cloudinaryConfig } from './configs/cloudinary.config';
import { LessonEntity } from './modules/lessons/entities/lessons.entity';
import { PaymentView } from './modules/payments/entities/payment-view.entity';
import { PaymentEntity } from './modules/payments/entities/payment.entity';
import { CourseUserEntity } from './modules/courses-users/entities/courses-users.entity';
import { CoursesUsersModule } from './modules/courses-users/courses-users.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { LessonsUsersModule } from './modules/lessons-users/lessons-users.module';
import { LessonUserEntity } from './modules/lessons-users/entities/lessons-users.entity';
import { QuestionsModule } from './modules/questions/questions.module';
import { QuestionEntity } from './modules/questions/entities/question.entity';
import { AnswerEntity } from './modules/answers/entities/answer.entity';
import { AnswersModule } from './modules/answers/answers.module';
import { CourseUserView } from './modules/courses-users/entities/courses-users-view.entity';

@Module({
  imports: [
    UsersModule,
    CategoryModule,
    CourseModule,
    LessonsModule,
    AuthModule,
    UploadModule,
    PaymentsModule,
    CoursesUsersModule,
    LessonsUsersModule,
    QuestionsModule,
    AnswersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          CategoryEntity,
          UserEntity,
          CourseEntity,
          LessonEntity,
          PaymentEntity,
          PaymentView,
          CourseUserView,
          CourseUserEntity,
          LessonUserEntity,
          QuestionEntity,
          AnswerEntity
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'CLOUDINARY_CONFIG',
      useFactory: cloudinaryConfig,
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}

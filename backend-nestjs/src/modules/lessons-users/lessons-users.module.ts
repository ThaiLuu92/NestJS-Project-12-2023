import { Module } from '@nestjs/common';
import { LessonsUsersController } from './lessons-users.controller';
import { LessonsUsersService } from './lessons-users.service';
import { LessonUserRepository } from './lessons-users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LessonUserEntity } from './entities/lessons-users.entity';
import { QuestionRepository } from '../questions/questions.repository';
import { QuestionEntity } from '../questions/entities/question.entity';
import { AnswerEntity } from '../answers/entities/answer.entity';
import { CourseUserEntity } from '../courses-users/entities/courses-users.entity';
import { CourseUserRepository } from '../courses-users/courese-users.repository';
import { CourseUserView } from '../courses-users/entities/courses-users-view.entity';
import { ExportPDFService } from 'src/utils/exportPDF/exportPDF.service';
import { EmailService } from 'src/utils/mail/mail.service';

@Module({
  imports:[TypeOrmModule.forFeature([LessonUserEntity,QuestionEntity,AnswerEntity,CourseUserEntity,CourseUserView]),JwtModule],
  controllers: [LessonsUsersController],
  providers: [LessonsUsersService,LessonUserRepository,QuestionRepository,CourseUserRepository,ExportPDFService,EmailService]
})
export class LessonsUsersModule {}

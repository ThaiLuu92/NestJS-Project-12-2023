import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionRepository } from './questions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { QuestionEntity } from './entities/question.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig, multerConfigImage } from 'src/configs/multer.config';
import { ConfigModule } from '@nestjs/config';
import { ImportCSV } from 'src/utils/importCSV.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity]),
    JwtModule,
    MulterModule.registerAsync({
      useFactory: multerConfigImage,
    }),
    ConfigModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionRepository,ImportCSV],
})
export class QuestionsModule {}

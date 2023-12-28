import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './entities/answer.entity';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfigImage } from 'src/configs/multer.config';
import { ConfigModule } from '@nestjs/config';
import { AnswerRepository } from './answers.repository';
import { ImportCSV } from 'src/utils/importCSV.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity]),
    JwtModule,
    MulterModule.registerAsync({
      useFactory: multerConfigImage,
    }),
    ConfigModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersService,AnswerRepository, ImportCSV],
})
export class AnswersModule {}

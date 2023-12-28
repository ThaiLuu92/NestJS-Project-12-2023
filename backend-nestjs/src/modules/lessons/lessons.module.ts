import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lessons.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig, multerConfigImage } from 'src/configs/multer.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { cloudinaryConfig } from 'src/configs/cloudinary.config';
import { LessonRepository } from './lessons.repository';
import { UploadService } from 'src/utils/upload.util';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), MulterModule.registerAsync({
    useFactory: multerConfigImage,
  }),
  ConfigModule, JwtModule],
  controllers: [LessonsController],
  providers: [LessonsService,LessonRepository,UploadService]
})
export class LessonsModule {
  constructor(configService: ConfigService) {
    cloudinaryConfig(configService).then(() => {
      console.log('Cloudinary configuration completed.');
    });
  }
}

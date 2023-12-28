import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { UploadService } from '../../utils/upload.util';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig, multerConfigImage } from 'src/configs/multer.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { cloudinaryConfig } from 'src/configs/cloudinary.config';
import { CourseRepository } from './course.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]),
   MulterModule.registerAsync({
    useFactory: multerConfigImage,
  }),
  ConfigModule, JwtModule],
  controllers: [CourseController],
  providers: [CourseService,UploadService,CourseRepository],
})
export class CourseModule {
  constructor(configService: ConfigService) {
    cloudinaryConfig(configService).then(() => {
      console.log('Cloudinary configuration completed.');
    });
  }
}


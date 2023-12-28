import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from '../upload.util';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { cloudinaryConfig } from 'src/configs/cloudinary.config';
import { multerConfig } from 'src/configs/multer.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
    ConfigModule, 
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {
  constructor(configService: ConfigService) {
    cloudinaryConfig(configService).then(() => {
      console.log('Cloudinary configuration completed.');
    });
  }
}

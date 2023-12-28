import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/entities/auth.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig, multerConfigImage } from 'src/configs/multer.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadService } from 'src/utils/upload.util';
import { cloudinaryConfig } from 'src/configs/cloudinary.config';
import { UserRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MulterModule.registerAsync({
    useFactory: multerConfigImage,
  }),
  ConfigModule, ],
  controllers: [UsersController],
  providers: [UsersService,UploadService,UserRepository]
})
export class UsersModule {
  constructor(configService: ConfigService) {
    cloudinaryConfig(configService).then(() => {
      console.log('Cloudinary configuration completed.');
    });
  }
}

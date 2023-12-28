import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const cloudinaryConfig = async (configService: ConfigService) => {
  cloudinary.config({
    cloud_name: configService.get<string>('CLOUDINARY_NAME'),
    api_key: configService.get<string>('CLOUDINARY_API_KEY'),
    api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
  });
};

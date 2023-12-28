import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage, memoryStorage } from 'multer'


export const multerConfig = async (): Promise<MulterOptions> => {
    return {
        storage: memoryStorage(),
        limits:{
            files:10,
            fileSize: 5 * 1024 * 1024, // 5 MB limit
        }
        
    }
};

export const multerConfigImage = async (): Promise<MulterOptions> => {
    return {
        storage: diskStorage({}),
        limits:{
            files:10,
            fileSize: 5 * 1024 * 1024, // 5 MB limit
        }
        
    }
};
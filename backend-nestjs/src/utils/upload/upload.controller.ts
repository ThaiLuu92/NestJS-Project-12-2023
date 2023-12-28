import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadService } from '../upload.util';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    constructor(private readonly fileService: UploadService) { }

    @Post('upload-single')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file): Promise<string> {
        return this.fileService.uploadFile(file,'test');
    }

    @Post('upload-multiple')
    @UseInterceptors(FilesInterceptor('files', 5))
    async uploadFiles(@UploadedFiles() files): Promise<string[]> {
        const uploadedFileUrls: string[] = await Promise.all(
            files.map(async (file) => await this.fileService.uploadFile(file)),
        );
        return uploadedFileUrls;
    }
}

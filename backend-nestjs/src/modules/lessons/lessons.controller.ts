import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../../utils/upload.util';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsService } from './lessons.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';

@Controller('/api/v1/lessons')
export class LessonsController {
  constructor(
    private readonly lessonService: LessonsService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  async findAll(
    @Query('name') query: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.lessonService.findAll(query, page, pageSize);
  }

  @Get('/soft-deleted')
  async findSoftDeleted(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.lessonService.findSoftDeleted((page = 1), (pageSize = 10));
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'lesson_img', maxCount: 1 },
      { name: 'exercise', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateLessonDto,
  ): Promise<CreateLessonDto> {
    try {
      // Kiểm tra xem có file lesson_img được upload không
      if (files['lesson_img']) {
        const imageUrl = await this.uploadService.uploadFile(
          files['lesson_img'][0],
          'lesson-images',
        );
        body.lesson_img = imageUrl;
      }

      // Kiểm tra xem có file exercise được upload không
      if (files['exercise']) {
        const exerciseUrl = await this.uploadService.uploadFile(
          files['exercise'][0],
          'exercise-images',
        );
        body.exercise = exerciseUrl;
      }
      const result = await this.lessonService.create(body);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'lesson_img', maxCount: 1 },
      { name: 'exercise', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UpdateLessonDto,
  ) {
    console.log(22222,body);

    // Kiểm tra xem có file lesson_img được upload không
    if (files['lesson_img']) {
      const imageUrl = await this.uploadService.uploadFile(
        files['lesson_img'][0],
        'lesson-images',
      );
      body.lesson_img = imageUrl;
    }

    // Kiểm tra xem có file exercise được upload không
    if (files['exercise']) {
      const exerciseUrl = await this.uploadService.uploadFile(
        files['exercise'][0],
        'exercise-images',
      );
      body.exercise = exerciseUrl;
    }
    return this.lessonService.update(id, body);
  }

  @Delete('/hard-delete-all')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDeleteAll() {
    return this.lessonService.hardDeleteAll();
  }

  @Delete('/hard-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDelete(@Param('id') id: string) {
    return this.lessonService.hardDelete(id);
  }

  @Delete('/soft-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async softDelete(@Param('id') id: string) {
    return this.lessonService.softDelete(id);
  }

  @Put('/restore/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreById(@Param('id') id: string) {
    return this.lessonService.restoreById(id);
  }

  @Put('/soft-delete-all/restore')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreAll() {
    return this.lessonService.restoreAll();
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async updateStatus(@Param('id') id: string, @Body() body: UpdateLessonDto) {
    const updatedCourse = await this.lessonService.updateStatus(id, body);
    return updatedCourse;
  }
}

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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseService } from './course.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../../utils/upload.util';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';

@Controller('/api/v1/courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly uploadService: UploadService,
  ) {}
  @Get('/all')
  async findAll(
  ) {
    return this.courseService.findAll();
  }
  @Get()
  async findAllPaginatiton(
    @Query('name') query: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.courseService.findAllPaginatiton(query ,page , pageSize);
  }

  @Get('/soft-deleted')
  async findSoftDeleted(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.courseService.findSoftDeleted(page = 1, pageSize = 10);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('course_img'))
  async create(
    @UploadedFile() file,
    @Body() body: CreateCourseDto,
  ): Promise<CreateCourseDto> {
    try {
      if (file) {
        const imageUrl = await this.uploadService.uploadFile(
          file,
          'course-images',
        ); 
        body.course_img = imageUrl;
      }
      const result = await this.courseService.create(body);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('course_img'))
  async update(@Param('id') id: string,@UploadedFile() file, @Body() body: UpdateCourseDto) {    
    if (file) {
      const imageUrl = await this.uploadService.uploadFile(
        file,
        'course-images',
      ); 
      body.course_img = imageUrl;
    }
    return this.courseService.update(id, body);
  }

  @Delete('/hard-delete-all')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDeleteAll() {
    return this.courseService.hardDeleteAll();
  }

  @Delete('/hard-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDelete(@Param('id') id: string) {
    return this.courseService.hardDelete(id);
  }

  @Delete('/soft-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async softDelete(@Param('id') id: string) {
    return this.courseService.softDelete(id);
  }

  @Put('/restore/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreById(@Param('id') id: string) {
    return this.courseService.restoreById(id);
  }

  @Put('/soft-delete-all/restore')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreAll() {
    return this.courseService.restoreAll();
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async updateStatus(@Param('id') id: string, @Body() body: UpdateCourseDto) {
    const updatedCourse = await this.courseService.updateStatus(id, body);
    return updatedCourse;
  }
}

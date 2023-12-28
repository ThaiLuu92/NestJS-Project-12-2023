import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/question.dto';
import { ImportCSV } from 'src/utils/importCSV.util';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/v1/questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly importCSV: ImportCSV,
  ) {}
  @Get()
  async findAll(
    @Query('courses_id') courses_id: string,
    @Query('lesson_id') lesson_id: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.questionsService.findAll(courses_id,lesson_id, page, pageSize);
  }

  @Get('/soft-deleted')
  async findSoftDeleted(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.questionsService.findSoftDeleted((page = 1), (pageSize = 10));
  }

  @Get('/lesson-user/:id')
  async findByLessonId(@Param('id') id: string) {
    return this.questionsService.findByLessonId(id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Post('/import-csv')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file_csv'))
  async createMany(@UploadedFile() file) {
    if (file) {
      const data = await this.importCSV.uploadFile(file);
      return this.questionsService.createMany(data);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async create(@Body() createCategoryDto: QuestionDto) {
    return this.questionsService.create(createCategoryDto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() body: QuestionDto) {
    return this.questionsService.update(id, body);
  }

  @Delete('/hard-delete-all')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDeleteAll() {
    return this.questionsService.hardDeleteAll();
  }

  @Delete('/hard-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDelete(@Param('id') id: string) {
    return this.questionsService.hardDelete(id);
  }

  @Delete('/soft-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async softDelete(@Param('id') id: string) {
    return this.questionsService.softDelete(id);
  }

  @Put('/restore/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreById(@Param('id') id: string) {
    return this.questionsService.restoreById(id);
  }

  @Put('/soft-delete-all/restore')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreAll() {
    return this.questionsService.restoreAll();
  }
}

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
import { ImportCSV } from 'src/utils/importCSV.util';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';

@Controller('/api/v1/answers')
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly importCSV: ImportCSV,
  ) {}

  @Get()
  async findAll(
    @Query('question_id') question_id: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.answersService.findAll(question_id, page, pageSize);
  }

  @Get('/soft-deleted')
  async findSoftDeleted(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.answersService.findSoftDeleted(page, pageSize);
  }

  @Get('/questions/:id')
  async findByLessonId(@Param('id') id: string) {
    return this.answersService.findByQuestionId(id);
  }


  @Post('/import-csv')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file_csv'))
  async createMany(@UploadedFile() file) {
    if (file) {
      const data = await this.importCSV.uploadFile(file);
      return this.answersService.createMany(data);
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() body: AnswerDto) {
    return this.answersService.update(id, body);
  }

  @Delete('/hard-delete-all')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDeleteAll() {
    return this.answersService.hardDeleteAll();
  }

  @Delete('/hard-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDelete(@Param('id') id: string) {
    return this.answersService.hardDelete(id);
  }

  @Delete('/soft-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async softDelete(@Param('id') id: string) {
    return this.answersService.softDelete(id);
  }

  @Put('/restore/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreById(@Param('id') id: string) {
    return this.answersService.restoreById(id);
  }

  @Put('/soft-delete-all/restore')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreAll() {
    return this.answersService.restoreAll();
  }
}

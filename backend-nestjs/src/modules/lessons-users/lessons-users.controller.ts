import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LessonsUsersService } from './lessons-users.service';
import { UpdateLessonUserDto } from './dto/update-lessons-users.dto';
import { CheckLessonUserDto } from './dto/check-lessons-users.dto';

@Controller('/api/v1/lessons-users')
export class LessonsUsersController {
  constructor(private readonly lessonsUsersService: LessonsUsersService) {}
  @Put('/status/:id')
  async updateStatusNextLesson(@Param('id') id: string, @Body() body: any){
    const updatedCategory = await this.lessonsUsersService.updateStatusNextLesson(
      id,
      body,
    );
    return updatedCategory;
  }

  @Put('/:id')
  async updateStatus(@Param('id') id: string, @Body() body :CheckLessonUserDto[]){
    
    const updatedCategory = await this.lessonsUsersService.updateStatus(
      id,
      body,
    );
    return updatedCategory;
  }



  @Get()
  async findAll() {
    return this.lessonsUsersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.lessonsUsersService.findOne(id);
  }
}

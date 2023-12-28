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
import { CoursesUsersService } from './courses-users.service';
import { CreateCourseUserDto } from './dto/creaete-courses-users.dto';
import { UpdateCourseUserDto } from './dto/update-courses-user.dto';
CoursesUsersService;

@Controller('/api/v1/courses-users')
export class CoursesUsersController {
  constructor(private readonly coursesUsersService: CoursesUsersService) {}

  @Post()
  async create(@Body() body: CreateCourseUserDto) {
    return this.coursesUsersService.create(body);
  }

  // @Put('/:id')
  // async updateStatus(
  //   @Param('id') id: string,
  //   @Body() body: UpdateCourseUserDto,
  // ) {
  //   const updatedCategory = await this.coursesUsersService.updateStatus(
  //     id,
  //     body,
  //   );
  //   return updatedCategory;
  // }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.coursesUsersService.findAll(page = 1, pageSize = 10);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.coursesUsersService.findOne(id);
  }
}

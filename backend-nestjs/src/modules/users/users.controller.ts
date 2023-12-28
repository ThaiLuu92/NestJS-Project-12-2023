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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../../utils/upload.util';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAvatarrDto } from './dto/update-avatar.dto';

@Controller('/api/v1/users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly uploadService: UploadService,
  ) {}

  @Get('/search')
  async search(
    @Query('user_name') query: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.userService.search(query, page = 1, pageSize = 2);
  }
  @Get()
  async findAll(
    @Query('user_name') query: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.userService.findAll(query ,page , pageSize );
  }
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Put('/:id')
  async update(@Param('id') id: string,@Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Patch('/status/:id')
  async updateStatus(@Param('id') id: string,@Body() body: UpdateUserDto) {
    return this.userService.updateStatus(id, body);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(@Param('id') id: string,@UploadedFile() file, @Body() body: UpdateAvatarrDto) {    
    if (file) {
        const imageUrl = await this.uploadService.uploadFile(
          file,
          'course-images',
        ); 
        body.avatar = imageUrl;
      }
    const updatedCourse = await this.userService.updateAvatar(id, body);
    return updatedCourse;
  }
}

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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';

@Controller('/api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/all')
  async findAll(
  ) {
    return this.categoryService.findAll();
  }

  
  @Get()
  async findAllPaginatiton(
    @Query('name') query: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.categoryService.findAllPaginatiton(query, page, pageSize);
  }



  @Get('/soft-deleted')
  async findSoftDeleted(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.categoryService.findSoftDeleted((page = 1), (pageSize = 10));
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('/hard-delete-all')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDeleteAll() {
    return this.categoryService.hardDeleteAll();
  }

  @Delete('/hard-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async hardDelete(@Param('id') id: string) {
    return this.categoryService.hardDelete(id);
  }

  @Delete('/soft-delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async softDelete(@Param('id') id: string) {
    return this.categoryService.softDelete(id);
  }

  @Put('/restore/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreById(@Param('id') id: string) {
    return this.categoryService.restoreById(id);
  }

  @Put('/soft-delete-all/restore')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async restoreAll() {
    return this.categoryService.restoreAll();
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async updateStatus(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.updateStatus(id, body);
    return updatedCategory;
  }
}

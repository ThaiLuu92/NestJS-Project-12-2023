import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/categories.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}
  // 1
  async findAllPaginatiton(query: string, page: number, pageSize: number) {
    return await this.categoryRepository.findAllPaginatiton(query, page, pageSize);
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  // 2
  async findSoftDeleted(page: number, pageSize: number) {
    return await this.categoryRepository.findSoftDeleted(page, pageSize);
  }

  // 3
  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOne(id);
      if (!category) {
        throw new NotFoundException('Category không tồn tại');
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  // 5
  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const checkName = await this.categoryRepository.findOneByName(data.name);
      if (checkName) {
        throw new NotFoundException('Tên category đã tồn tại.');
      }
      const category = await this.categoryRepository.create(data);
      return category;
    } catch (error) {
      throw error;
    }
  }

  // 6
  async update(id: string, data: UpdateCategoryDto): Promise<CategoryEntity> {    
    try {
      const checkName = await this.categoryRepository.findOneByName(data.name);
      if (checkName) {
        throw new NotFoundException('Tên category đã tồn tại.');
      }
      const category = await this.categoryRepository.update(id, data);
      if (!category) {
        throw new NotFoundException('Category không tồn tại');
      }
      return category;
    } catch (error) {
      throw error;
    }
  }
  // 7
  async hardDeleteAll() {
    const categories = await this.categoryRepository.hardDeleteAll();
    return categories;
  }

  // 8
  async hardDelete(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepository.hardDelete(id);
      return category;
    } catch (error) {
      throw error;
    }
  }
  // 9
  async softDelete(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.softDelete(id);
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }
    return category;
  }
  // 10
  async restoreById(id: string) {
    const category = await this.categoryRepository.restoreById(id);
    if (!category) {
      throw new NotFoundException('Category xóa mềm không tồn tại');
    }
    return category;
  }
  // 11
  async restoreAll() {
    const categories = await this.categoryRepository.restoreAll();
    return categories;
  }

  // 13
  async updateStatus(id: string, newStatus: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.updateStatus(id, newStatus);
    return category;
  }
}

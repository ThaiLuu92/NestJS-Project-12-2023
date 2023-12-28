import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './entities/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepositoryTypeORM: Repository<CategoryEntity>,
  ) {}

  // 1
  async findAllPaginatiton(query: string, page: number, pageSize: number) {
    const [categories, total] =
      await this.categoryRepositoryTypeORM.findAndCount({
        where: [{ name: Like(`%${query}%`), isDelete: 'false' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    return {
      data: categories,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findAll() {
   return await this.categoryRepositoryTypeORM.find({
      where: [{ isDelete: 'false' }],
    });
  }

  // 2
  async findSoftDeleted(page: number = 1, pageSize: number = 10) {
    const [softDeletedCategories, total] =
      await this.categoryRepositoryTypeORM.findAndCount({
        where: { isDelete: 'true' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

    return {
      data: softDeletedCategories,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // 3
  async findOne(id: string) {
    try {
      const category = await this.categoryRepositoryTypeORM.findOne({
        where: { id, isDelete: 'false' },
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  // 5.1
  async findOneByName(name = '') {
    return await this.categoryRepositoryTypeORM.findOne({
      where: { name, isDelete: 'false' },
    });
  }

  // 5.2
  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const category = this.categoryRepositoryTypeORM.create(data);
      return await this.categoryRepositoryTypeORM.save(category);
    } catch (error) {
      throw error;
    }
  }

  // 6
  async update(id: string, data: UpdateCategoryDto): Promise<CategoryEntity> {
    try {
      const result = await this.categoryRepositoryTypeORM.update(id, data);
      return await this.categoryRepositoryTypeORM.findOne({
        where: { id, isDelete: 'false' },
      });
    } catch (error) {
      throw error;
    }
  }

  // 7
  async hardDeleteAll() {
    const categories = await this.categoryRepositoryTypeORM.find();
    return await this.categoryRepositoryTypeORM.remove(categories);
  }

  // 8
  async hardDelete(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepositoryTypeORM.findOne({
        where: { id },
      });
      return await this.categoryRepositoryTypeORM.remove(category);
    } catch (error) {
      throw error;
    }
  }

  // 9
  async softDelete(id: string): Promise<CategoryEntity> {
    const result = await this.categoryRepositoryTypeORM.update(id, {
      isDelete: 'true',
    });
    return await this.categoryRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 10
  async restoreById(id: string) {
    const result = await this.categoryRepositoryTypeORM.update(id, {
      isDelete: 'false',
    });
    return await this.categoryRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 11
  async restoreAll() {
    const categories = await this.categoryRepositoryTypeORM.find({
      where: { isDelete: 'true' },
    });
    categories.forEach((category) => {
      category.isDelete = 'false';
    });
    return await this.categoryRepositoryTypeORM.save(categories);
  }

  // 13
  async updateStatus(
    id: string,
    newStatus: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepositoryTypeORM.findOne({
      where: { id },
    });
    category.status = newStatus.status;
    return this.categoryRepositoryTypeORM.save(category);
  }
}

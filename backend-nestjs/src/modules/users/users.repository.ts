import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/auth.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAvatarrDto } from './dto/update-avatar.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositoryTypeORM: Repository<UserEntity>,
  ) {}
  // 1 Không sử dụng
  async search(query: string, page: number, pageSize: number) {
    const [courses, total] = await this.userRepositoryTypeORM.findAndCount({
      where: [{ user_name: Like(`%${query}%`) }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: courses,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
  // 2
  async findAll(query: string, page: number, pageSize: number) {
    const [users, total] = await this.userRepositoryTypeORM.findAndCount({
      where: [{ user_name: Like(`%${query}%`) }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: users,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
  // 3
  async findOne(id: string) {
    try {
      const user = await this.userRepositoryTypeORM.findOne({
        where: { id },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  // 4
  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    try {
      const result = await this.userRepositoryTypeORM.update(id, data);
      return await this.userRepositoryTypeORM.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
  // 5
  async updateAvatar(id: string, data: UpdateAvatarrDto): Promise<UserEntity> {
    const user = await this.userRepositoryTypeORM.findOne({
      where: { id },
    });
    user.avatar = data.avatar;
    return this.userRepositoryTypeORM.save(user);
  }

  async updateStatus(id: string, data: any): Promise<UserEntity> {
    const user = await this.userRepositoryTypeORM.findOne({
      where: { id },
    });
    user.status = data.status;
    return this.userRepositoryTypeORM.save(user);
  }
}

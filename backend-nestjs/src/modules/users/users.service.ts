import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../auth/entities/auth.entity';
import { UpdateAvatarrDto } from './dto/update-avatar.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  // 1
  async search(query: string, page: number = 1, pageSize: number = 10) {
    const data = await this.userRepository.search(query, page, pageSize);
    return data;
  }
  // 2
  async findAll(query: string, page: number, pageSize: number) {
    return await this.userRepository.findAll(query, page, pageSize);
  }
  // 3
  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new NotFoundException('User không tồn tại');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  // 4
  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.update(id, data);
      if (!user) {
        throw new NotFoundException('User không tồn tại');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  // 5
  async updateAvatar(id: string, data: UpdateAvatarrDto): Promise<UserEntity> {
    const course = await this.userRepository.updateAvatar(id, data);
    return course;
  }

  async updateStatus(id: string, data: any): Promise<UserEntity> {
    const course = await this.userRepository.updateStatus(id, data);
    return course;
  }
}

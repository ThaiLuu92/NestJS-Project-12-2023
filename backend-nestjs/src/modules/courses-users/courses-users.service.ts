import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseUserRepository } from './courese-users.repository';
import { CourseUserEntity } from './entities/courses-users.entity';
import { CreateCourseUserDto } from './dto/creaete-courses-users.dto';
import { UpdateCourseUserDto } from './dto/update-courses-user.dto';

@Injectable()
export class CoursesUsersService {
  constructor(private readonly courseUserRepository: CourseUserRepository) {}

  // 1
  async create(data: CreateCourseUserDto): Promise<CourseUserEntity> {
    try {
      const courseUser = await this.courseUserRepository.create(data);
      return courseUser;
    } catch (error) {
      throw error;
    }
  }

  // // 2
  // async updateStatus(
  //   id: string,
  //   newStatus: UpdateCourseUserDto,
  // ): Promise<CourseUserEntity> {
  //   const courseUser = await this.courseUserRepository.updateStatus(
  //     id,
  //     newStatus,
  //   );
  //   return courseUser;
  // }

  // 3
  async findAll(page: number, pageSize: number) {
    return await this.courseUserRepository.findAll(page, pageSize);
  }

  // 4
  async findOne(id: string) {
    try {
      const courseUser = await this.courseUserRepository.findOne(id);
      if (!courseUser) {
        throw new NotFoundException('Khóa học đã mua không tồn tại');
      }
      return courseUser;
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { removeAccents } from 'src/utils/common.util';
import { CourseUserEntity } from './entities/courses-users.entity';
import { CreateCourseUserDto } from './dto/creaete-courses-users.dto';
import { UpdateCourseUserDto } from './dto/update-courses-user.dto';
import { CourseUserView } from './entities/courses-users-view.entity';

@Injectable()
export class CourseUserRepository {
  constructor(
    @InjectRepository(CourseUserEntity)
    private readonly courseUserRepositoryTypeORM: Repository<CourseUserEntity>,
    @InjectRepository(CourseUserView)
    private readonly courseUserViewRepositoryTypeORM: Repository<CourseUserView>,

  ) {}
  // 1
  async create(data: CreateCourseUserDto): Promise<CourseUserEntity> {
    try {
      const courseUser = this.courseUserRepositoryTypeORM.create(data);
      return await this.courseUserRepositoryTypeORM.save(courseUser);
    } catch (error) {
      throw error;
    }
  }

  // 2
  async updateStatus(
    id: string,
  ): Promise<CourseUserEntity> {
    const courseUser = await this.courseUserRepositoryTypeORM.findOne({
      where: { id },
    });
    courseUser.status = "complete";
    return this.courseUserRepositoryTypeORM.save(courseUser);
  }

  // 3
  async findAll(page: number = 1, pageSize: number = 10) {
    const [courses, total] =
      await this.courseUserViewRepositoryTypeORM.findAndCount({
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
  // 4
  async findOne(id: string) {
    try {
      const courseUser = await this.courseUserViewRepositoryTypeORM.find({
        where: { user_id: id },
      });
      return courseUser;
    } catch (error) {
      throw error;
    }
  }
}

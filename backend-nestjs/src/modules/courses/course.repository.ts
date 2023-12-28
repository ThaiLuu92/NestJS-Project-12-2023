import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepositoryTypeORM: Repository<CourseEntity>,
  ) {}

  // 1
  async findAllPaginatiton(query: string, page: number, pageSize: number) {
    const [courses, total] =
      await this.courseRepositoryTypeORM.findAndCount({
        where: [{ name: Like(`%${query}%`),  isDelete: 'false'}],
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

  async findAll() {
    return await this.courseRepositoryTypeORM.find({
       where: [{ isDelete: 'false' }],
     });
   }

  // 2
  async findSoftDeleted(page: number = 1, pageSize: number = 10) {
    const [softDeletedCourses, total] =
      await this.courseRepositoryTypeORM.findAndCount({
        where: { isDelete: 'true' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

    return {
      data: softDeletedCourses,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // 3
  async findOne(id: string) {
    try {
      const course = await this.courseRepositoryTypeORM.findOne({
        where: { id, isDelete: 'false' },
      });
      return course;
    } catch (error) {
      throw error;
    }
  }

  // 5.1
  async findOneByName(name="") {
    return await this.courseRepositoryTypeORM.findOne({
      where: { name, isDelete: 'false' },
    });
  }

  // 5.2
  async create(data: CreateCourseDto): Promise<CourseEntity> {

    try {
      const course = this.courseRepositoryTypeORM.create(data);
      return await this.courseRepositoryTypeORM.save(course);
    } catch (error) {
      throw error;
    }
  }

  // 6
  async update(id: string, data: UpdateCourseDto): Promise<CourseEntity> {
    try {
      const result = await this.courseRepositoryTypeORM.update(id, data);
      return await this.courseRepositoryTypeORM.findOne({
        where: { id, isDelete: "false" },
      });
    } catch (error) {      
      throw error;
    }
  }

  // 7
  async hardDeleteAll() {
    const courses = await this.courseRepositoryTypeORM.find();
    return await this.courseRepositoryTypeORM.remove(courses);
  }

  // 8
  async hardDelete(id: string): Promise<CourseEntity> {
    try {
      const course = await this.courseRepositoryTypeORM.findOne({
        where: { id },
      });
      return await this.courseRepositoryTypeORM.remove(course);
    } catch (error) {
      throw error;
    }
  }

  // 9
  async softDelete(id: string): Promise<CourseEntity> {
    const result = await this.courseRepositoryTypeORM.update(id, {
      isDelete: 'true',
    });
    return await this.courseRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 10
  async restoreById(id: string) {
    const result = await this.courseRepositoryTypeORM.update(id, {
      isDelete: 'false',
    });
    return await this.courseRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 11
  async restoreAll() {
    const courses = await this.courseRepositoryTypeORM.find({
      where: { isDelete: 'true' },
    });
    courses.forEach((course) => {
        course.isDelete = 'false';
    });
    return await this.courseRepositoryTypeORM.save(courses);
  }

  // 13
  async updateStatus(id: string, newStatus: UpdateCourseDto): Promise<CourseEntity> {
    const course = await this.courseRepositoryTypeORM.findOne({
      where: { id },
    });
    course.status = newStatus.status;
    return this.courseRepositoryTypeORM.save(course);
  }
}

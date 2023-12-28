import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository } from './course.repository';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}
  // 1
  async findAllPaginatiton(query: string, page: number, pageSize: number) {
    return await this.courseRepository.findAllPaginatiton(query, page, pageSize);
  }
  async findAll() {
    return await this.courseRepository.findAll();
  }

  // 2
  async findSoftDeleted(page: number, pageSize: number) {
    return await this.courseRepository.findSoftDeleted(page, pageSize);
  }

  // 3
  async findOne(id: string) {
    try {
      const course = await this.courseRepository.findOne(id);
      if (!course) {
        throw new NotFoundException('Course không tồn tại');
      }
      return course;
    } catch (error) {
      throw error;
    }
  }

  // 5
  async create(data: CreateCourseDto): Promise<CourseEntity> {
    try {
      const checkName = await this.courseRepository.findOneByName(data.name);
      if (checkName) {
        throw new NotFoundException('Tên Course đã tồn tại.');
      }
      const course = await this.courseRepository.create(data);
      return course;
    } catch (error) {
      throw error;
    }
  }
  // 6
  async update(id: string, data: UpdateCourseDto): Promise<CourseEntity> {
    try {
      if (data.name) {
        const checkName = await this.courseRepository.findOneByName(data.name);
        if (checkName) {
          throw new NotFoundException('Tên Course đã tồn tại.');
        }
      }
      const course = await this.courseRepository.update(id, data);
      if (!course) {
        throw new NotFoundException('Course không tồn tại');
      }
      return course;
    } catch (error) {
      throw error;
    }
  }
  // 7
  async hardDeleteAll() {
    const courses = await this.courseRepository.hardDeleteAll();
    return courses;
  }

  // 8
  async hardDelete(id: string): Promise<CourseEntity> {
    try {
      const course = await this.courseRepository.hardDelete(id);
      return course;
    } catch (error) {
      throw error;
    }
  }
  // 9
  async softDelete(id: string): Promise<CourseEntity> {
    const course = await this.courseRepository.softDelete(id);
    if (!course) {
      throw new NotFoundException('Course không tồn tại');
    }
    return course;
  }
  // 10
  async restoreById(id: string) {
    const course = await this.courseRepository.restoreById(id);
    if (!course) {
      throw new NotFoundException('Course xóa mềm không tồn tại');
    }
    return course;
  }
  // 11
  async restoreAll() {
    const courses = await this.courseRepository.restoreAll();
    return courses;
  }

  // 13
  async updateStatus(
    id: string,
    newStatus: UpdateCourseDto,
  ): Promise<CourseEntity> {
    const course = await this.courseRepository.updateStatus(id, newStatus);
    return course;
  }
}

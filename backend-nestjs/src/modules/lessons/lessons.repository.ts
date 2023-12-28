import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { LessonEntity } from './entities/lessons.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonRepository {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepositoryTypeORM: Repository<LessonEntity>,
  ) {}

  // 1
  async findAll(query: string, page: number, pageSize: number) {
    const [lessons, total] = await this.lessonRepositoryTypeORM.findAndCount({
      where: [{ name: Like(`%${query}%`),  isDelete: 'false'}],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: lessons,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // 2
  async findSoftDeleted(page: number = 1, pageSize: number = 10) {
    const [softDeletedLessons, total] =
      await this.lessonRepositoryTypeORM.findAndCount({
        where: { isDelete: 'true' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

    return {
      data: softDeletedLessons,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // 3
  async findOne(id: string) {
    try {
      const lesson = await this.lessonRepositoryTypeORM.findOne({
        where: { id, isDelete: 'false' },
      });
      return lesson;
    } catch (error) {
      throw error;
    }
  }

  // 5.1
  async findOneByName(name="", courses_id) {
    return await this.lessonRepositoryTypeORM.findOne({
      where: { name,courses_id, isDelete:  'false' },
    });
  }

  // 5.2
  async create(data: CreateLessonDto): Promise<LessonEntity> {
    try {
      const course = this.lessonRepositoryTypeORM.create(data);
      return await this.lessonRepositoryTypeORM.save(course);
    } catch (error) {
      throw error;
    }
  }

  // 6
  async update(id: string, data: UpdateLessonDto): Promise<LessonEntity> {
    try {
      const result = await this.lessonRepositoryTypeORM.update(id, data);
      return await this.lessonRepositoryTypeORM.findOne({
        where: { id, isDelete: 'false' },
      });
    } catch (error) {
      throw error;
    }
  }

  // 7
  async hardDeleteAll() {
    const lessons = await this.lessonRepositoryTypeORM.find();
    return await this.lessonRepositoryTypeORM.remove(lessons);
  }

  // 8
  async hardDelete(id: string): Promise<LessonEntity> {
    try {
      const lesson = await this.lessonRepositoryTypeORM.findOne({
        where: { id },
      });
      return await this.lessonRepositoryTypeORM.remove(lesson);
    } catch (error) {
      throw error;
    }
  }

  // 9
  async softDelete(id: string): Promise<LessonEntity> {
    const result = await this.lessonRepositoryTypeORM.update(id, {
      isDelete: 'true',
    });
    return await this.lessonRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 10
  async restoreById(id: string) {
    const result = await this.lessonRepositoryTypeORM.update(id, {
      isDelete: 'false',
    });
    return await this.lessonRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 11
  async restoreAll() {
    const lessons = await this.lessonRepositoryTypeORM.find({
      where: { isDelete: 'true' },
    });
    lessons.forEach((course) => {
      course.isDelete = 'false';
    });
    return await this.lessonRepositoryTypeORM.save(lessons);
  }

  // 13
  async updateStatus(
    id: string,
    newStatus: UpdateLessonDto,
  ): Promise<LessonEntity> {
    const lesson = await this.lessonRepositoryTypeORM.findOne({
      where: { id },
    });
    lesson.status = newStatus.status;
    return this.lessonRepositoryTypeORM.save(lesson);
  }
  // 14
  async findAllByCourseId(courses_id: string) {
    return await this.lessonRepositoryTypeORM.find({
      where: { courses_id },
    });
  }
}

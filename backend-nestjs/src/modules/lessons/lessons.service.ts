import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonRepository } from './lessons.repository';
import { LessonEntity } from './entities/lessons.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
    constructor(private readonly lessonRepository: LessonRepository) {}
    // 1
    async findAll(query: string,page: number, pageSize: number) {
      return await this.lessonRepository.findAll(query, page, pageSize);
    }
  
    // 2
    async findSoftDeleted(page: number, pageSize: number) {
      return await this.lessonRepository.findSoftDeleted(page, pageSize);
    }
  
    // 3
    async findOne(id: string) {
      try {
        const lesoon = await this.lessonRepository.findOne(id);
        if (!lesoon) {
          throw new NotFoundException('Lesoon không tồn tại');
        }
        return lesoon;
      } catch (error) {
        throw error;
      }
    }
  
    
    // 5
    async create(data: CreateLessonDto): Promise<LessonEntity> {
      try {
        const checkName = await this.lessonRepository.findOneByName(data.name, data.courses_id);
        if (checkName) {
          throw new NotFoundException('Tên Lesson đã tồn tại.');
        }
        const lesson = await this.lessonRepository.create(data);
        return lesson;
      } catch (error) {
        throw error;
      }
    }
  
    // 6
    async update(id: string, data: UpdateLessonDto): Promise<LessonEntity> {
      try {
        if (data.name && data.courses_id) {
          const checkName = await this.lessonRepository.findOneByName(data.name, data.courses_id);
          if (checkName) {
            throw new NotFoundException('Tên Lesson đã tồn tại.');
          }
        }
        const lesson = await this.lessonRepository.update(id, data);
        if (!lesson) {
          throw new NotFoundException('Lesson không tồn tại');
        }
        return lesson;
      } catch (error) {
        throw error;
      }
    }
    // 7
    async hardDeleteAll() {
      const lessons = await this.lessonRepository.hardDeleteAll();
      return lessons;
    }
  
    // 8
    async hardDelete(id: string): Promise<LessonEntity> {
      try {
        const lesson = await this.lessonRepository.hardDelete(id);
        return lesson;
      } catch (error) {
        throw error;
      }
    }
    // 9
    async softDelete(id: string): Promise<LessonEntity> {
      const lesson = await this.lessonRepository.softDelete(id);
      if (!lesson) {
        throw new NotFoundException('Lesson không tồn tại');
      }
      return lesson;
    }
    // 10
    async restoreById(id: string) {
      const lesson = await this.lessonRepository.restoreById(id);
      if (!lesson) {
        throw new NotFoundException('Lesson xóa mềm không tồn tại');
      }
      return lesson;
    }
    // 11
    async restoreAll() {
      const lessons = await this.lessonRepository.restoreAll();
      return lessons;
    }

    // 13
    async updateStatus(
      id: string,
      newStatus: UpdateLessonDto,
    ): Promise<LessonEntity> {
      const lesson = await this.lessonRepository.updateStatus(id, newStatus);
      return lesson;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { removeAccents } from 'src/utils/common.util';
import { LessonUserEntity } from './entities/lessons-users.entity';
import { CreateLessonUserDto } from './dto/creaete-lessons-users.dto';
import { UpdateLessonUserDto } from './dto/update-lessons-users.dto';

@Injectable()
export class LessonUserRepository {
  constructor(
    @InjectRepository(LessonUserEntity)
    private readonly lessonUserRepositoryTypeORM: Repository<LessonUserEntity>,
  ) {}
  // 1
  async create(data: CreateLessonUserDto): Promise<LessonUserEntity> {
    try {
      const courseUser = this.lessonUserRepositoryTypeORM.create(data);
      return await this.lessonUserRepositoryTypeORM.save(courseUser);
    } catch (error) {
      throw error;
    }
  }

  // 2
  async updateStatus(
    id: string,
    newStatus: UpdateLessonUserDto,
  ): Promise<LessonUserEntity> {
    const courseUser = await this.lessonUserRepositoryTypeORM.findOne({
      where: { id },
    });
    courseUser.status = newStatus.status;
    return this.lessonUserRepositoryTypeORM.save(courseUser);
  }

  // 3
  async findAll() {
    return await this.lessonUserRepositoryTypeORM.find();
  }
  // 4
  async findOne(id: string) {
    try {
      const courseUser = await this.lessonUserRepositoryTypeORM.find({
        where: { courses_user_id: id },
      });
      return courseUser;
    } catch (error) {
      throw error;
    }
  }

    // 4
    async findOneByStatus(id: string) {
      try {
        const respose = await this.lessonUserRepositoryTypeORM.findOne({
          where: { courses_user_id: id, status:'uncomplete'},
        });
        
        
        return respose;
      } catch (error) {
      
        
        throw error;
      }
    }
}

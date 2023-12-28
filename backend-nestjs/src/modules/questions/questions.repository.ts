import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { QuestionEntity } from './entities/question.entity';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepositoryTypeORM: Repository<QuestionEntity>,
  ) {}
  // 1
  async findAll(
    courses_id: string,
    lesson_id: string,
    page: number,
    pageSize: number,
  ) {
    const [questions, total] =
      await this.questionRepositoryTypeORM.findAndCount({
        where: [
          {
            courses_id: Like(`%${courses_id}%`),
            lesson_id: Like(`%${lesson_id}%`),
            isDelete: 'false',
          },
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    return {
      data: questions,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // 2
  async findSoftDeleted(page: number = 1, pageSize: number = 10) {
    const [softDeletedQuestions, total] =
      await this.questionRepositoryTypeORM.findAndCount({
        where: { isDelete: 'true' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

    return {
      data: softDeletedQuestions,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // 3
  async findOne(id: string) {
    try {
      const question = await this.questionRepositoryTypeORM.findOne({
        where: { id, isDelete: 'false' },
      });
      return question;
    } catch (error) {
      throw error;
    }
  }

  // async findAllQuestions(condition:any) {
  //   try {
  //     const question = await this.questionRepositoryTypeORM.find({
  //       where: [{  isDelete: 'false' },{relations:["answers"]}, ...condition]
  //     });
  //     return question;
  //   } catch (error) {
  //     throw error;
  //   }
  // }


  async findAllQuestions2(condition: any) {
    try {
      const questions = await this.questionRepositoryTypeORM.find({
        where: [ ...condition ],
        relations: ["answers"],
      });
      return questions;
    } catch (error) {
      throw error;
    }
  }
  

  async findByLessonId(id: string) {
    try {
      const question = await this.questionRepositoryTypeORM.find({
        where: { lesson_id: id, isDelete: 'false' }, relations:["answers"]
      });
      return question;
    } catch (error) {
      throw error;
    }
  }

  // 5.1
  async findOneByName(question_text = '') {
    return await this.questionRepositoryTypeORM.findOne({
      where: { question_text, isDelete: 'false' },
    });
  }

  // 5.2
  async create(data: QuestionDto): Promise<QuestionEntity> {
    try {
      const question = this.questionRepositoryTypeORM.create(data);
      return await this.questionRepositoryTypeORM.save(question);
    } catch (error) {
      throw error;
    }
  }

  // 6
  async update(id: string, data: QuestionDto): Promise<QuestionEntity> {
    try {
      const result = await this.questionRepositoryTypeORM.update(id, data);
      return await this.questionRepositoryTypeORM.findOne({
        where: { id, isDelete: 'false' },
      });
    } catch (error) {
      throw error;
    }
  }

  // 7
  async hardDeleteAll() {
    const categories = await this.questionRepositoryTypeORM.find();
    return await this.questionRepositoryTypeORM.remove(categories);
  }

  // 8
  async hardDelete(id: string): Promise<QuestionEntity> {
    try {
      const question = await this.questionRepositoryTypeORM.findOne({
        where: { id },
      });
      return await this.questionRepositoryTypeORM.remove(question);
    } catch (error) {
      throw error;
    }
  }

  // 9
  async softDelete(id: string): Promise<QuestionEntity> {
    const result = await this.questionRepositoryTypeORM.update(id, {
      isDelete: 'true',
    });
    return await this.questionRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 10
  async restoreById(id: string) {
    const result = await this.questionRepositoryTypeORM.update(id, {
      isDelete: 'false',
    });
    return await this.questionRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 11
  async restoreAll() {
    const categories = await this.questionRepositoryTypeORM.find({
      where: { isDelete: 'true' },
    });
    categories.forEach((question) => {
      question.isDelete = 'false';
    });
    return await this.questionRepositoryTypeORM.save(categories);
  }

  // 12
  async createMany(data: QuestionDto[]): Promise<QuestionEntity[]> {
    try {
      const questionArray = this.questionRepositoryTypeORM.create(data);
      return await this.questionRepositoryTypeORM.save(questionArray);
    } catch (error) {
      throw error;
    }
  }
}

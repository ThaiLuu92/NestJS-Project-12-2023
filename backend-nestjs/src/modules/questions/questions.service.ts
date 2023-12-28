import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionRepository } from './questions.repository';
import { QuestionEntity } from './entities/question.entity';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  // 1
  async findAll(
    courses_id: string,
    lesson_id: string,
    page: number,
    pageSize: number,
  ) {
    return await this.questionRepository.findAll(
      courses_id,
      lesson_id,
      page,
      pageSize,
    );
  }

  // 2
  async findSoftDeleted(page: number, pageSize: number) {
    return await this.questionRepository.findSoftDeleted(page, pageSize);
  }

  // 3
  async findOne(id: string) {
    try {
      const question = await this.questionRepository.findOne(id);
      if (!question) {
        throw new NotFoundException('question không tồn tại');
      }
      return question;
    } catch (error) {
      throw error;
    }
  }

  async findByLessonId(id: string) {
    try {
      const question = await this.questionRepository.findByLessonId(id);
      return question;
    } catch (error) {
      throw error;
    }
  }

  // 5
  async create(data: QuestionDto): Promise<QuestionEntity> {
    try {
      const checkName = await this.questionRepository.findOneByName(
        data.question_text,
      );
      if (checkName) {
        throw new NotFoundException('Tên question đã tồn tại.');
      }
      const question = await this.questionRepository.create(data);
      return question;
    } catch (error) {
      throw error;
    }
  }

  // 6
  async update(id: string, data: QuestionDto): Promise<QuestionEntity> {
    try {
      const checkName = await this.questionRepository.findOneByName(
        data.question_text,
      );
      if (checkName) {
        throw new NotFoundException('Tên question đã tồn tại.');
      }
      const question = await this.questionRepository.update(id, data);
      if (!question) {
        throw new NotFoundException('question không tồn tại');
      }
      return question;
    } catch (error) {
      throw error;
    }
  }
  // 7
  async hardDeleteAll() {
    const questions = await this.questionRepository.hardDeleteAll();
    return questions;
  }

  // 8
  async hardDelete(id: string): Promise<QuestionEntity> {
    try {
      const question = await this.questionRepository.hardDelete(id);
      return question;
    } catch (error) {
      throw error;
    }
  }
  // 9
  async softDelete(id: string): Promise<QuestionEntity> {
    const question = await this.questionRepository.softDelete(id);
    if (!question) {
      throw new NotFoundException('question không tồn tại');
    }
    return question;
  }
  // 10
  async restoreById(id: string) {
    const question = await this.questionRepository.restoreById(id);
    if (!question) {
      throw new NotFoundException('question xóa mềm không tồn tại');
    }
    return question;
  }
  // 11
  async restoreAll() {
    const questions = await this.questionRepository.restoreAll();
    return questions;
  }

  // 12
  async createMany(data: QuestionDto[]): Promise<QuestionEntity[]> {
    try {
      // const checkName = await this.questionRepository.findOneByName(data.question_text);
      // if (checkName) {
      //   throw new NotFoundException('Tên question đã tồn tại.');
      // }
      const question = await this.questionRepository.createMany(data);
      return question;
    } catch (error) {
      throw error;
    }
  }
}

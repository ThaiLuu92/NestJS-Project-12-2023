import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AnswerEntity } from './entities/answer.entity';
import { AnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answersRepositoryTypeORM: Repository<AnswerEntity>,
  ) {}
  // 1
  async findAll(question_id: string, page: number, pageSize: number) {
    const [answers, total] = await this.answersRepositoryTypeORM.findAndCount({
      where: [{ question_id: Like(`%${question_id}%`), isDelete: 'false' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: answers,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // 2
  async findSoftDeleted(page: number = 1, pageSize: number = 10) {
    const [softDeletedAnswers, total] =
      await this.answersRepositoryTypeORM.findAndCount({
        where: { isDelete: 'true' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    return {
      data: softDeletedAnswers,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findByQuestionId(id: string) {
    try {
      const answer = await this.answersRepositoryTypeORM.find({
        where: { question_id: id, isDelete: 'false' },
      });
      return answer;
    } catch (error) {
      throw error;
    }
  }

  // 6
  async update(id: string, data: AnswerDto): Promise<AnswerEntity> {
    try {
      const result = await this.answersRepositoryTypeORM.update(id, data);
      return await this.answersRepositoryTypeORM.findOne({
        where: { id, isDelete: 'false' },
      });
    } catch (error) {
      throw error;
    }
  }

  // 7
  async hardDeleteAll() {
    const categories = await this.answersRepositoryTypeORM.find();
    return await this.answersRepositoryTypeORM.remove(categories);
  }

  // 8
  async hardDelete(id: string): Promise<AnswerEntity> {
    try {
      const answer = await this.answersRepositoryTypeORM.findOne({
        where: { id },
      });
      return await this.answersRepositoryTypeORM.remove(answer);
    } catch (error) {
      throw error;
    }
  }

  // 9
  async softDelete(id: string): Promise<AnswerEntity> {
    const result = await this.answersRepositoryTypeORM.update(id, {
      isDelete: 'true',
    });
    return await this.answersRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 10
  async restoreById(id: string) {
    const result = await this.answersRepositoryTypeORM.update(id, {
      isDelete: 'false',
    });
    return await this.answersRepositoryTypeORM.findOne({
      where: { id },
    });
  }

  // 11
  async restoreAll() {
    const categories = await this.answersRepositoryTypeORM.find({
      where: { isDelete: 'true' },
    });
    categories.forEach((answer) => {
      answer.isDelete = 'false';
    });
    return await this.answersRepositoryTypeORM.save(categories);
  }

  // 12
  async createMany(data: AnswerDto[]): Promise<AnswerEntity[]> {
    try {
      const answerArray = this.answersRepositoryTypeORM.create(data);
      return await this.answersRepositoryTypeORM.save(answerArray);
    } catch (error) {
      throw error;
    }
  }
}

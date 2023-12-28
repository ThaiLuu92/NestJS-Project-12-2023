import { Injectable, NotFoundException } from '@nestjs/common';
import { AnswerRepository } from './answers.repository';
import { AnswerEntity } from './entities/answer.entity';
import { AnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswersService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  // 1
  async findAll(question_id: string, page: number, pageSize: number) {
    return await this.answerRepository.findAll(question_id, page, pageSize);
  }

  // 2
  async findSoftDeleted(page: number, pageSize: number) {
    return await this.answerRepository.findSoftDeleted(page, pageSize);
  }

  async findByQuestionId(id: string) {
    try {
      const question = await this.answerRepository.findByQuestionId(id);
      return question;
    } catch (error) {
      throw error;
    }
  }

  
  // 6
  async update(id: string, data: AnswerDto): Promise<AnswerEntity> {
    try {
      const answer = await this.answerRepository.update(id, data);
      if (!answer) {
        throw new NotFoundException('answer không tồn tại');
      }
      return answer;
    } catch (error) {
      throw error;
    }
  }
  // 7
  async hardDeleteAll() {
    const answers = await this.answerRepository.hardDeleteAll();
    return answers;
  }

  // 8
  async hardDelete(id: string): Promise<AnswerEntity> {
    try {
      const answer = await this.answerRepository.hardDelete(id);
      return answer;
    } catch (error) {
      throw error;
    }
  }
  // 9
  async softDelete(id: string): Promise<AnswerEntity> {
    const answer = await this.answerRepository.softDelete(id);
    if (!answer) {
      throw new NotFoundException('answer không tồn tại');
    }
    return answer;
  }
  // 10
  async restoreById(id: string) {
    const answer = await this.answerRepository.restoreById(id);
    if (!answer) {
      throw new NotFoundException('answer xóa mềm không tồn tại');
    }
    return answer;
  }
  // 11
  async restoreAll() {
    const answers = await this.answerRepository.restoreAll();
    return answers;
  }

  // 12
  async createMany(data: AnswerDto[]): Promise<AnswerEntity[]> {
    try {
      const answer = await this.answerRepository.createMany(data);
      return answer;
    } catch (error) {
      throw error;
    }
  }
}

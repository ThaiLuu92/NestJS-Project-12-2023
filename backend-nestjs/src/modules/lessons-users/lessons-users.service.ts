import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonUserRepository } from './lessons-users.repository';
import { QuestionRepository } from '../questions/questions.repository';
import { CheckLessonUserDto } from './dto/check-lessons-users.dto';
import { CourseUserRepository } from '../courses-users/courese-users.repository';
import { ExportPDFService } from 'src/utils/exportPDF/exportPDF.service';
import { EmailService } from 'src/utils/mail/mail.service';

@Injectable()
export class LessonsUsersService {
  constructor(
    private readonly lessonUserRepository: LessonUserRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly courseUserRepository: CourseUserRepository,
    private readonly exportPDFService: ExportPDFService,
    private readonly emailService: EmailService,
  ) {}

  // 2
  async updateStatus(id: string, body: CheckLessonUserDto[]) {
    const condition = body.map((item) => ({
      id: item.questionId,
    }));
    const question = await this.questionRepository.findAllQuestions2(condition);

    let isNotCorrect = false;
    for (let index = 0; index < question.length; index++) {
      const questionDB = question[index];
      const result = questionDB.answers.find(
        (answer) => answer.id == body[index].answerId,
      ).is_correct;

      if (result == '0') {
        isNotCorrect = true;
        break;
      }
    }
    if (isNotCorrect) {
      throw new NotFoundException([
        'msgCheck:Kết quả chưa đạt. Bạn vui lòng làm lại',
      ]);
    }

    const newStatus = { status: 'complete' };
    const lessonUser = await this.lessonUserRepository.updateStatus(
      id,
      newStatus,
    );
    const lessonNext = await this.lessonUserRepository.findOneByStatus(
      lessonUser.courses_user_id,
    );

    if (lessonNext === null) {
      const course = await this.courseUserRepository.updateStatus(
        lessonUser.courses_user_id,
      );
      // const contentPDF = this.exportPDFService.ertificateContentPDF(
      //   'Thái',
      //   'Học N4',
      // );
      // const bufferPDF = await this.exportPDFService.generatePdf(contentPDF);
      // await this.emailService.sendMail(
      //   'daytiengnhatn3@gmail.com',
      //   'Xác nhận mua khóa học',
      //   'Chúc mừng bạn hoàn thành khóa học',
      //   bufferPDF,
      // );
      return course;
    }

    const nextLessonNewStatus = { status: 'processing' };
    const nextLessonUser = await this.lessonUserRepository.updateStatus(
      lessonNext.id,
      nextLessonNewStatus,
    );
    return nextLessonUser;
  }

  async updateStatusNextLesson(id: string, newStatus) {
    const lessonUser = await this.lessonUserRepository.updateStatus(
      id,
      newStatus,
    );

    return lessonUser;
  }

  // 3
  async findAll() {
    return await this.lessonUserRepository.findAll();
  }

  // 4
  async findOne(id: string) {
    try {
      const lessonUser = await this.lessonUserRepository.findOne(id);
      if (!lessonUser) {
        throw new NotFoundException('Bài học không tồn tại');
      }
      return lessonUser;
    } catch (error) {
      throw error;
    }
  }
}

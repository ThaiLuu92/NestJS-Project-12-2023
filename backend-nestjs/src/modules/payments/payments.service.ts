import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from './payments.repository';
import { CourseUserRepository } from '../courses-users/courese-users.repository';
import { LessonRepository } from '../lessons/lessons.repository';
import { LessonUserRepository } from '../lessons-users/lessons-users.repository';
import { EmailService } from 'src/utils/mail/mail.service';
import { paymentTemplate } from 'src/utils/mail/payment.template';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly courseUserRepository: CourseUserRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly lessonUserRepository: LessonUserRepository,
    private readonly emailService: EmailService,
  ) {}
  // 1
  async create(paymentData) {
    try {
      const conditions = {
        user_id: paymentData.user_id,
        courses_id: paymentData.courses_id,
      };

      // Kiểm tra xem người dùng đã mua khóa học chưa
      const paymentCheck = await this.paymentRepository.findByUserIdAndCourseId(
        conditions.user_id,
        conditions.courses_id,
      );

      if (paymentCheck) {
        throw new NotFoundException(['msgCheck: Khóa học này bạn đã mua rồi']);
      }

      // Tạo thanh toán mới
      const newPayment = {
        user_id: paymentData.user_id,
        courses_id: paymentData.courses_id,
        category_id: paymentData.category_id,
        course_price: paymentData.course_price,
      };

      const createdPayment = await this.paymentRepository.create(newPayment);

      if (!createdPayment) {
        throw new NotFoundException(['msgCheck: Không thể tạo thanh toán']);
      }

      // Tạo liên kết giữa người dùng và khóa học
      const newCourseUser = {
        user_id: paymentData.user_id,
        courses_id: paymentData.courses_id,
        courses_name: paymentData.course_name,
      };

      const createdCourseUser =
        await this.courseUserRepository.create(newCourseUser);

      if (!createdCourseUser) {
        throw new NotFoundException(
          ['msgCheck: Không thể tạo liên kết người dùng và khóa học']
        );
      }

      const lessons = await this.lessonRepository.findAllByCourseId(
        paymentData.courses_id,
      );

      for (const lesson of lessons) {
        const newLessonUser = {
          courses_user_id: createdCourseUser.id,
          courses_name: createdCourseUser.courses_name,
          lesson_id: lesson.id,
          lesson_name: lesson.name,
          // status: 'uncompleted',
          lessons_exercise: lesson.exercise,
          lesson_img: lesson.lesson_img,
          lesson_video: lesson.video,
        };

        const createdLessonUser =
          await this.lessonUserRepository.create(newLessonUser);

        if (!createdLessonUser) {
          throw new NotFoundException(['msgCheck: Không thể tạo bản ghi lesson_user']);
        }
      }

      await this.emailService.sendMail(
        paymentData.user_email,
        'Xác nhận mua khóa học',
        paymentTemplate(paymentData.course_name, paymentData.course_price),
      );

      return createdCourseUser;
    } catch (error) {
      console.log(1111,error);
      
      throw error;
    }
  }
  // 2
  async findAllPaginatiton(query: string,page: number, pageSize: number) {
    return await this.paymentRepository.findAllPaginatiton(query, page, pageSize);
  }

  async findAll() {
    return await this.paymentRepository.findAll();
  }
  // 3
  async findOne(id: string) {
    try {
      const payment = await this.paymentRepository.findOne(id);
      if (!payment) {
        throw new NotFoundException('Payment không tồn tại');
      }
      return payment;
    } catch (error) {
      throw error;
    }
  }
  // 4
  async findUserPaymentByUserId(user_id: string) {
    return await this.paymentRepository.findUserPaymentByUserId(user_id);
  }
}

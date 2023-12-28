import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { UserEntity } from 'src/modules/auth/entities/auth.entity';
import { CategoryEntity } from 'src/modules/categories/entities/categories.entity';
import { CourseEntity } from 'src/modules/courses/entities/course.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('payments.id', 'id')
      .addSelect('payments.course_price', 'course_price')
      .addSelect('payments.createdAt', 'createdAt')
      .addSelect('users.user_name', 'user_name')
      .addSelect('users.id', 'user_id')
      .addSelect('users.email', 'user_email')
      .addSelect('categories.name', 'category_name')
      .addSelect('courses.name', 'course_name')
      .from(PaymentEntity, 'payments')
      .leftJoin(UserEntity, 'users', 'users.id = payments.user_id')
      .leftJoin(
        CategoryEntity,
        'categories',
        'categories.id = payments.category_id',
      )
      .leftJoin(CourseEntity, 'courses', 'courses.id = payments.courses_id'),
})
export class PaymentView {
    @ViewColumn()
    id: string;
  
    @ViewColumn()
    course_price: number;
  
    @ViewColumn()
    createdAt: Date;
  
    @ViewColumn()
    user_name: string;
  
    @ViewColumn()
    user_email: string;

    @ViewColumn()
    user_id: string;
  
    @ViewColumn()
    category_name: string;
  
    @ViewColumn()
    course_name: string;
  }

import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { CourseEntity } from 'src/modules/courses/entities/course.entity';
import { UserEntity } from 'src/modules/auth/entities/auth.entity';
import { CourseUserEntity } from './courses-users.entity';


@ViewEntity({
    expression: (dataSource: DataSource) =>
      dataSource
        .createQueryBuilder()
        .select('courses_users.id', 'id')
        .addSelect('courses_users.status', 'status')
        .addSelect('courses_users.createdAt', 'createdAt')
        .addSelect('courses_users.courses_name', 'courses_name')
        .addSelect('users.id', 'user_id')
        .addSelect('users.user_name', 'user_name')
        .addSelect('courses.course_img', 'course_img')
        .addSelect('courses.id', 'course_id')
        .from(CourseUserEntity, 'courses_users')  
        .leftJoin(UserEntity, 'users', 'users.id = courses_users.user_id')
        .leftJoin(CourseEntity, 'courses', 'courses.id = courses_users.courses_id'),
  })
  export class CourseUserView {
    @ViewColumn()
    id: string;
  
    @ViewColumn()
    status: string;
  
    @ViewColumn()
    createdAt: Date;
  
    @ViewColumn()
    courses_name: string;
  
    @ViewColumn()
    user_name: string;

    @ViewColumn()
    user_id: string;
  
    @ViewColumn()
    course_img: string;
  
    @ViewColumn()
    course_id: string;
  }

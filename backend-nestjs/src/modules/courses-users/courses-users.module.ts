import { Module } from '@nestjs/common';
import { CoursesUsersController } from './courses-users.controller';
import { CoursesUsersService } from './courses-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseUserEntity } from './entities/courses-users.entity';
import { JwtModule } from '@nestjs/jwt';
import { CourseUserRepository } from './courese-users.repository';
import { CourseUserView } from './entities/courses-users-view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseUserEntity, CourseUserView]),
    JwtModule,
  ],
  controllers: [CoursesUsersController],
  providers: [CoursesUsersService, CourseUserRepository],
})
export class CoursesUsersModule {}

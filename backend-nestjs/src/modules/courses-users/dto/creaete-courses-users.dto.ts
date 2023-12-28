import { IsNotEmpty } from 'class-validator';

export class CreateCourseUserDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  courses_id: string ;

  @IsNotEmpty()
  courses_name: string ;

}
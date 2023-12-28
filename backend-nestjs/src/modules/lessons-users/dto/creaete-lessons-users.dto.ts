import { IsNotEmpty } from 'class-validator';

export class CreateLessonUserDto {
  @IsNotEmpty()
  lesson_id: string;

  @IsNotEmpty()
  courses_user_id: string;

  @IsNotEmpty()
  courses_name: string;

  @IsNotEmpty()
  lesson_name: string;

  @IsNotEmpty()
  lesson_img: string;

  @IsNotEmpty()
  lessons_exercise: string;

  @IsNotEmpty()
  lesson_video: string;
}

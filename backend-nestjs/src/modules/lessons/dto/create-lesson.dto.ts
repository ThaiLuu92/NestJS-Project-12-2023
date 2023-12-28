import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  lesson_img?: any ;

  @IsOptional()
  video?: any ;

  @IsOptional()
  exercise?: any ;

  @IsOptional()
  status?: boolean;

  @IsNotEmpty()
  courses_id: string;
}
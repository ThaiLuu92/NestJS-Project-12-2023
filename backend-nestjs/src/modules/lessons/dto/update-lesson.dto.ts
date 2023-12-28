import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateLessonDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  lesson_img?: any ;

  @IsOptional()
  video?: any ;

  @IsOptional()
  exercise?: any ;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  courses_id?: string;
}
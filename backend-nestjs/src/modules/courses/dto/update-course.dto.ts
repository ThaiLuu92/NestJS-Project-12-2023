import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  level?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  duration?: number;

  @IsOptional()
  course_img?: string;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  category_id?: string;
}

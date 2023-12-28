import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCourseDto {
  // @IsNotEmpty()
  // id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  level?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  duration?: number;

  @IsOptional()
  course_img?: any ;

  @IsOptional()
  status?: boolean;

  @IsNotEmpty()
  category_id: string;
}

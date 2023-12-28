import { IsNotEmpty } from 'class-validator';

export class UpdateCourseUserDto {
  @IsNotEmpty()
  status: string ;
}
import { IsNotEmpty } from 'class-validator';

export class UpdateLessonUserDto {
  @IsNotEmpty()
  status: string ;
}
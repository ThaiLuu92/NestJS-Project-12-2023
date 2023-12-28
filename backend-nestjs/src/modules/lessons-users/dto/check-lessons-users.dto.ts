import { IsNotEmpty } from 'class-validator';

export class CheckLessonUserDto {
  @IsNotEmpty()
  questionId: string ;

  @IsNotEmpty()
  answerId: string ;
}
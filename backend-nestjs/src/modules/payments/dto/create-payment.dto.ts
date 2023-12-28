import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  course_price: number;

  @IsNotEmpty()
  category_id: string ;

  @IsNotEmpty()
  user_id: string ;

  @IsNotEmpty()
  courses_id: string;
}
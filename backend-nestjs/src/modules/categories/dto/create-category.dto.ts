import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @MaxLength(20, { message: 'Tên không được quá 20 ký tự' })
  name: string;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @MaxLength(200, { message: 'Tên không được quá 200 ký tự' })
  description: string;

}

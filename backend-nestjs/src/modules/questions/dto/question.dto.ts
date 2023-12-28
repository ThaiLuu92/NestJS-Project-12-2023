import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
export class QuestionDto {
    @IsOptional({ message: 'Câu hỏi không được để trống' })
    @MaxLength(200, { message: 'Tên không được quá 200 ký tự' })
    question_text?: string;

    @IsOptional({ message: 'Khóa học không được để trống' })
    courses_id?: string;

    @IsOptional({ message: 'Bài học không được để trống' })
    lesson_id?: string;
  }
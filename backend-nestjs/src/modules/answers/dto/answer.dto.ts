import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
export class AnswerDto {
    @IsOptional({ message: 'Câu trả lời không được để trống' })
    @MaxLength(200, { message: 'Câu trả lời không được quá 200 ký tự' })
    answer_text?: string;

    @IsOptional({ message: 'ID câu hỏi không được để trống' })
    question_id?: string;

    @IsOptional({ message: 'Đáp án không được để trống' })
    is_correct?: string;
  }

  
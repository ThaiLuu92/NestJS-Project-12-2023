// reset-password.dto.ts
import { IsEmail } from 'class-validator';

export class RequestResetPasswordDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;
}

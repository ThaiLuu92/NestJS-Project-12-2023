// change-password.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Mật xác nhận không được để trống' })
  codeResetPassword: string;

  @MinLength(6, { message: 'Mật khẩu mới phải trên 6 ký tự' })
  newPassword: string;
}

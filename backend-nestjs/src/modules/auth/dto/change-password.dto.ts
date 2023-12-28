// change-password.dto.ts
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  oldPassword: string;

  @MinLength(6, { message: 'Mật khẩu mới phải trên 6 ký tự' })
  newPassword: string;
}

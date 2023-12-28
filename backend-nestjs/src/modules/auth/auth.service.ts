import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/auth.dto';
import { EmailService } from 'src/utils/mail/mail.service';
import { registerTemplate } from 'src/utils/mail/register.template';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { generateRandomToken } from 'src/utils/common.util';
import { resetPasswordTemplate } from 'src/utils/mail/reset-passsword.template';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {};

  async register(newUser: CreateUserDto) {
    const checkEmail = await this.authRepository.findOne({
      where: { email: newUser.email },
    });
    if (checkEmail) {
      throw new ConflictException(['msgEmail: Email đã tồn tại']);
    }
    const hashedPassword = await hash(newUser.password, 10);
    newUser.password = hashedPassword;
    try {
      const user = this.authRepository.create(newUser);
      this.emailService.sendMail(
        newUser.email,
        'Đăng ký thành công',
        registerTemplate(newUser.user_name, newUser.email),
      );
      return await this.authRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginUserDto) {
    try {
      const checkEmail = await this.authRepository.findOne({
        where: { email: data.email },
      });

      if (checkEmail) {
        const isPasswordMatch = await compare(
          data.password,
          checkEmail.password,
        );
        if (isPasswordMatch) {
          const assetToken = await this.jwtService.signAsync({
            id: checkEmail.id,
            role: checkEmail.role,
          });
          delete checkEmail.password;
          const successLogin = {
            message: 'Đăng nhập thành công',
            assetToken: assetToken,
            user: {
              id: checkEmail.id,
              role: checkEmail.role,
              avatar: checkEmail.avatar,
              address: checkEmail.address,
              dob: checkEmail.dob,
              email: checkEmail.email,
              level: checkEmail.level,
              phone: checkEmail.phone,
              user_name: checkEmail.user_name,
            },
          };

          return successLogin;
        } else {
          throw new ConflictException(['msgPassword: Mật khẩu không đúng']);
        }
      } else {
        throw new NotFoundException(['msgEmail: Email không tồn tại']);
      }
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userId: string, changePasswordData: ChangePasswordDto) {
    try {
      const user = await this.authRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('Người dùng không tồn tại');
      }
      // Kiểm tra mật khẩu cũ
      const isOldPassword = await compare(
        changePasswordData.oldPassword,
        user.password,
      );
      if (!isOldPassword) {
        throw new UnauthorizedException(['msgOldPassword: Mật khẩu cũ không đúng']);
      }
      // Hash mật khẩu mới và lưu vào cơ sở dữ liệu
      const hashedNewPassword = await hash(changePasswordData.newPassword, 10);
      user.password = hashedNewPassword;
      await this.authRepository.save(user);
      return { message: 'Đổi mật khẩu thành công' };
    } catch (error) {
      throw error;
    }
  }

  async requestPasswordReset(email: string) {
    try {
      const user = await this.authRepository.findOne({
        where: { email: email },
      });
      if (!user) {
        throw new NotFoundException(['msgEmail: Email không tồn tại.']);
      }
      // Nếu đã có mã resetPassword, xóa nó
      if (user.resetPassword && user.resetPasswordExpiry) {
        user.resetPassword = null;
        user.resetPasswordExpiry = null;
      }
      const resetPasswordExpiryInMinutes = 1; // Đặt lại thành 1 phút
      const resetPasswordExpiry = new Date();
      resetPasswordExpiry.setMinutes(
        resetPasswordExpiry.getMinutes() + resetPasswordExpiryInMinutes,
      );

      const resetPassword = generateRandomToken(6);
      user.resetPassword = resetPassword;
      user.resetPasswordExpiry = resetPasswordExpiry.toISOString();
      await this.authRepository.save(user);
      await this.emailService.sendMail(
        email,
        'Lấy lại mật khẩu',
        resetPasswordTemplate(resetPassword, resetPasswordExpiryInMinutes),
      );
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data: ResetPasswordDto) {
    try {
      const user = await this.authRepository.findOne({
        where: { email: data.email },
      });
      if (!user) {
        throw new UnauthorizedException(['msgEmail: Người dùng không tồn tại.']);
      }
      // Kiểm tra tính hợp lệ của token
      if (user.resetPassword !== data.codeResetPassword) {
        throw new UnauthorizedException(['msgCode: Mã xác nhận không hợp lệ.']);
      }
      // Kiểm tra xem token có hết hạn không
      if (
        user.resetPasswordExpiry &&
        new Date() > new Date(user.resetPasswordExpiry)
      ) {
        throw new UnauthorizedException(
          ['msgCode: Yêu cầu đặt lại mật khẩu đã hết hạn. Vui lòng gửi lại yêu cầu mới.']
        );
      }

      const hashedPassword = await hash(data.newPassword, 10);
      user.password = hashedPassword;
      user.resetPassword = null;
      user.resetPasswordExpiry = null;
      await this.authRepository.save(user);
      return { message: 'Đặt lại mật khẩu thành công.' };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.authRepository.findOne({
        where: { id }
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

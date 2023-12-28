import {
  Body,
  Controller,
  ExecutionContext,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.dto';
import { LoginUserDto } from './dto/login.dto';
import { Response } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto, @Res() res: Response) {
    try {
      const ret = await this.authService.login(body);
      res.setHeader('Authorization', 'Bearer ' + ret.assetToken);
      return res.json(ret);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/change-password/:id')
  // Sau dùng UseGuards để xác thực người dùng
  async changePassword(
    @Param('id') id: string,
    @Body() body: ChangePasswordDto,
  ) {
    try {
      return await this.authService.changePassword(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Post('/request-password-reset')
  async requestPasswordReset(
    @Body() resetPasswordEmail: RequestResetPasswordDto,
  ) {
    try {
      return this.authService.requestPasswordReset(resetPasswordEmail.email);
    } catch (error) {
      throw error;
    }
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    try {
      return this.authService.resetPassword(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('/fetch-login')
  @UseGuards(AuthGuard)
  async findOne(@Req() request) {
    const id = request.id;
    return this.authService.findOne(id);
  }
}

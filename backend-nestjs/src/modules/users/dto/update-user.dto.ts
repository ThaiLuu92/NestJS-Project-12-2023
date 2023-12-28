import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  user_name?: string;

  @IsOptional()
  dob?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  phone?: number;

  @IsOptional()
  level?: string;
}

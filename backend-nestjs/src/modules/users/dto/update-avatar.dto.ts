import { IsOptional } from 'class-validator';

export class UpdateAvatarrDto {
  @IsOptional()
  avatar?: any;
}
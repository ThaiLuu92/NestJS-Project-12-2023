
import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';
export const ROLES_KEY = 'roles_nestjs_project';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
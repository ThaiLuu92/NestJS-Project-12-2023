import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  level: string;

  @Column({
    default:
      'http://res.cloudinary.com/dr9lw2qk0/image/upload/v1701404820/yx0nyadrspas8s2bc6qn.png',
  })
  avatar: string;

  @Column({ nullable: true })
  avatarPublicId: string;

  @Column({ nullable: true })
  resetPassword: string;

  @Column({ nullable: true })
  resetPasswordExpiry: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | null;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;
}

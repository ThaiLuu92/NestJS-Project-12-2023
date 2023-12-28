import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'courses-users' })
export class CourseUserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  courses_id: string;

  @Column({ default: 'active' }) 
  courses_name: string;

  @Column({ default: 'uncompelete' })
  status: string 

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | null;

}
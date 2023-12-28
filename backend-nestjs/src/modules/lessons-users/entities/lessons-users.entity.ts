import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'lessons-users' })
export class LessonUserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  lesson_id: string;

  @Column()
  courses_user_id: string;

  @Column() 
  courses_name: string;

  @Column({ default: 'uncomplete' })
  status: string 

  @Column()
  lesson_name: string 

  @Column()
  lesson_img: string 

  @Column()
  lessons_exercise: string 

  @Column()
  lesson_video: string 

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date ;

}
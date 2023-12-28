import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('lessons')
  export class LessonEntity {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ nullable: true })
    lesson_img: string ;
  
    @Column({ nullable: true })
    video: string ;

    @Column({ nullable: true })
    exercise: string ;

    @Column({ default: true })
    status: boolean;
  
    @Column({ nullable: false })
    courses_id: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date | null;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date | null;
  
    @Column({ default: "false" })
    isDelete: string ;
  }
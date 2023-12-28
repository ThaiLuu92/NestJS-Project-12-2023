import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('courses')
@Unique(['name'])
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  level: string ;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  duration: number ;

  @Column({ nullable: true })
  course_img: string ;

  @Column({ default: true })
  status: boolean;

  @Column({  nullable: false })
  category_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | null;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @Column({ default: "false" })
  isDelete: string ;
}

import { AnswerEntity } from 'src/modules/answers/entities/answer.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  question_text: string;

  @Column()
  courses_id: string;

  @Column()
  lesson_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | null;

  @UpdateDateColumn({ type: 'timestamp'})
  updatedAt: Date | null;

  @Column({ default: "false" })
  isDelete: string 

  @OneToMany(()=> AnswerEntity, (answer)=>(answer.question))
  answers: AnswerEntity[]
}
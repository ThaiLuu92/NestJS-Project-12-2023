import { QuestionEntity } from 'src/modules/questions/entities/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  question_id: string;

  @Column()
  answer_text: string;

  @Column()
  is_correct: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | null;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @Column({ default: 'false' })
  isDelete: string;

  @ManyToOne(
    () => QuestionEntity,
    (question) => {
      question.answers;
    },
  )

  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}

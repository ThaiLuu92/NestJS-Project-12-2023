import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column() 
  course_price: number;

  @Column({ default: 'active' }) 
  status: string;

  @Column({  nullable: false })
  category_id: string;

  @Column({  nullable: false })
  user_id: string;

  @Column({  nullable: false })
  courses_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | null;

}
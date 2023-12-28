import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'categories' })
@Unique(['name'])
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true }) 
  status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | null;

  @UpdateDateColumn({ type: 'timestamp'})
  updatedAt: Date | null;

  @Column({ default: "false" })
  isDelete: string 
}

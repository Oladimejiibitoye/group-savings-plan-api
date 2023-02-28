import {
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @DeleteDateColumn()
  deletedOn?: Date;
  
}
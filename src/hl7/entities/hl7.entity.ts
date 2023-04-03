import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HL7Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  payload: string;
}

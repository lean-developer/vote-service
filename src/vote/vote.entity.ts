import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('vote')
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;
}

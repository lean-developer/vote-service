import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Member } from "src/member/member.entity";

@Entity('master')
export class Master {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @OneToMany(type => Member, member => member.master)
    members: Member[];
}
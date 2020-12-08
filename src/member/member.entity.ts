import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Master } from "src/master/master.entity";
import { MemberVote } from "src/vote/memberVote.entity";

@Entity('member')
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    pin: number;

    @ManyToOne( type => Master, master => master.members)
    master: Master;

    @OneToMany(type => MemberVote, membervote => membervote.member)
    membervotes: MemberVote[];
}
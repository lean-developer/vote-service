import { Entity, ManyToOne, Column } from "typeorm";
import { Vote } from "./vote.entity";
import { Member } from "src/member/member.entity";

@Entity('membervote')
export class MemberVote {
    @ManyToOne(type => Member, member => member.membervotes, { primary: true })
    member: Member;

    @ManyToOne(type => Vote, vote => vote.membervotes, { primary: true })
    vote: Vote;

    @Column()
    points: string;

    @Column({ length: 500 })
    note: string;
}
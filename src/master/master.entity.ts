import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Member } from "src/member/member.entity";
import { Vote } from "src/vote/vote.entity";
import { Product } from "src/vote/product.entity";

@Entity('master')
export class Master {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    uid: string;

    @OneToMany(type => Member, member => member.master)
    members: Member[];

    @OneToMany(type => Vote, vote => vote.master)
    votes: Vote[];

    @OneToMany(type => Product, product => product.master)
    products: Product[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, BeforeUpdate, BeforeInsert } from 'typeorm';
import { MemberVote } from './memberVote.entity';

@Entity('vote')
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    /**
     * open (
     *      - Members sehen Vote
     *      - Master kann Vote zum Schätzen freigeben -> running)
     * running (
     *      - Vote kann geschätzt werden
     *      - nur Master sieht alle Schätzungen
     *      - Members sehen ob die anderen Members geschätzt haben, aber nicht WIE sie geschätzt haben
     *      - Master kann Vote abeschließen -> complete)
     * complete (
     *      - Schätzung ist vorbei
     *      - Master kann Vote wieder aufmachen -> running
     *      - die Members könne ihre Schätzung nicht mehr ändern
     *      - alle Schätzungen können von allen Members eingesehen werden)
     */
    @Column({ length: 100 })
    status: string;

    @Column({ length: 100 })
    points: string;
    
    @Column('timestamp')
    created: Date;

    @Column('timestamp')
    modified: Date;

    @BeforeUpdate()
    modifiedTimestamp() {
        this.modified = new Date();
    }

    @BeforeInsert()
    createdTimestamp() {
        this.created = new Date();
    }

    @OneToMany(type => MemberVote, membervote => membervote.member)
    membervotes: MemberVote[];
}
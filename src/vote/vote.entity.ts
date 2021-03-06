import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, BeforeUpdate, BeforeInsert, ManyToOne } from 'typeorm';
import { MemberVote } from './memberVote.entity';
import { Master } from 'src/master/master.entity';
import { Product } from './product.entity';

@Entity('vote')
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    /**
     * leer (
     *      - Member sehen Vote nicht
     *      - Master kann Vote öffnen -> open)
     * open (
     *      - Members sehen Vote
     *      - Master kann Vote zum Schätzen freigeben -> running
     *      - Master kann Vote wieder schließen -> leer)
     * running (
     *      - Vote kann geschätzt werden
     *      - nur Master sieht alle Schätzungen
     *      - Members sehen ob die anderen Members geschätzt haben, aber nicht WIE sie geschätzt haben
     *      - Master kann Vote abeschließen -> done)
     * done (
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

    @ManyToOne( type => Master, master => master.votes)
    master: Master;

    @Column()
    productId: number;

    @OneToMany(type => MemberVote, membervote => membervote.member)
    membervotes: MemberVote[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, BeforeUpdate, BeforeInsert } from 'typeorm';

@Entity('vote')
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;
    
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
}
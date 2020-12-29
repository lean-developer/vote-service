import { Master } from "src/master/master.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 500 })
    note: string;

    @Column('timestamp')
    created: Date;

    @Column('timestamp')
    modified: Date;

    @ManyToOne( type => Master, master => master.products)
    master: Master;

    @BeforeUpdate()
    modifiedTimestamp() {
        this.modified = new Date();
    }

    @BeforeInsert()
    createdTimestamp() {
        this.created = new Date();
    }
}
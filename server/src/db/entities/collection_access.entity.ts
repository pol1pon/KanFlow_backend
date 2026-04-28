import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { User } from "./user.entity";
import { Team } from "./team.entity";
import { Collection } from "./collection.entity";
import { AccessCollection } from "../json_interface/collection-access";

@Entity('collection_access')
export class Collection_access{
    @PrimaryGeneratedColumn()
        id: number
    @ManyToOne(() => User, user => user.id, {nullable: true})
        public user_ : User | null

    @ManyToOne(() => Team, team => team.id, {nullable: true})
        public team_ : Team | null
    @ManyToOne(()=> Collection, collect => collect.id, { 
    onDelete: 'CASCADE'
})
        public collection_ : Collection
    @Column('jsonb')
        access: AccessCollection
    @CreateDateColumn()
        createdAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}
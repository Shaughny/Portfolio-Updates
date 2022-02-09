import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";



@Entity()
export class Stock extends BaseEntity {

    @PrimaryColumn()
    symbol!: string;

    @Column()
    company!: string;

    @Column("decimal",{ precision: 6, scale: 2})
    previousPrice!: number;

    @Column("decimal", { precision: 6, scale: 2 })
    currentPrice!: number;
    
    @ManyToMany(() => User, user => user.stocks)
    user!: User[];

}
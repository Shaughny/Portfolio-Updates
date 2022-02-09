import { Entity,Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Stock } from "./Stock";



@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @ManyToMany(() => Stock, stock => stock.user, {onDelete: "CASCADE"})
    @JoinTable()
    stocks!: Stock[];

}
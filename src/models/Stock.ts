import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn, ManyToMany} from "typeorm";
import { User } from "./User";



@Entity()
export class Stock extends BaseEntity {

    @PrimaryColumn()
    symbol!: string;

    @Column()
    company!: string;

    @Column("decimal",{ precision: 6, scale: 2,default: 0.00})
    previousPrice!: number;

    @Column("decimal", { precision: 6, scale: 2 ,default: 0.00})
    currentPrice!: number;
    
    @ManyToMany(() => User, user => user.stocks)
    user!: User[];

}
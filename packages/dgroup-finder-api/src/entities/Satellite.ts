import {Entity, Column, OneToMany, CreateDateColumn, ManyToOne, UpdateDateColumn} from "typeorm";
import {Length, IsNotEmpty, IsEmail} from "class-validator";
import {CoreEntity} from "./CoreEntity";
import {User} from "./User";
import {Dgroup} from "./Dgroup";

@Entity()
export class Satellite extends CoreEntity {

    @Column()
    @Length(4, 50)
    @IsNotEmpty()
    name: string;

    @Column()
    @Length(0, 500)
    description: string;

    @Column()
    @IsNotEmpty()
    country: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @OneToMany(type => User, user => user.satellite)
    users: User[];

    @OneToMany(type => Dgroup, dgroup => dgroup.satellite, {eager: false})
    dgroups: Dgroup[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => User)
    createdBy: string;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User)
    updatedBy: string;

}
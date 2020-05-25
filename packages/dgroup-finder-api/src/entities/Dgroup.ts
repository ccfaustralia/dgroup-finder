import {
    Entity,
    Column,
    ManyToOne, CreateDateColumn, UpdateDateColumn,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import {CoreEntity} from "./CoreEntity";
import {Satellite} from "./Satellite";
import {User} from "./User";

@Entity()
export class Dgroup extends CoreEntity {

    @Column()
    @Length(4, 50)
    @IsNotEmpty()
    name: string;

    @Column()
    @Length(0, 500)
    description: string;

    @Column({type: "float"})
    @IsNotEmpty()
    latitude: number;

    @Column({type: "float"})
    @IsNotEmpty()
    longitude: number;

    @ManyToOne(type => Satellite, satellite => satellite.dgroups, {eager: true})
    @IsNotEmpty()
    satellite: Satellite;

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
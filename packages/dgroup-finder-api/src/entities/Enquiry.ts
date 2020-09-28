import {
    Entity,
    Column,
    ManyToOne,
} from "typeorm";
import {IsNotEmpty, IsEmail} from "class-validator";
import {Dgroup} from "./Dgroup";
import {CoreEntity} from "./CoreEntity";

@Entity()
export class Enquiry extends CoreEntity {

    @Column()
    @IsNotEmpty()
    contactName: string;

    @Column()
    @IsEmail()
    contactEmail: string;

    @Column()
    contactPhone: string;

    @Column()
    contactGender: string;

    @Column()
    message: string;

    @ManyToOne(type => Dgroup, {eager: true})
    dgroup: Dgroup;

}
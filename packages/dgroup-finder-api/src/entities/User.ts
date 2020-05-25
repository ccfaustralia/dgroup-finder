import {
    Entity,
    Column,
    Unique,
    ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity,
} from "typeorm";
import {Length, IsNotEmpty, IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import {Satellite} from "./Satellite";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @Column()
    @Length(6, 100)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @ManyToOne(type => Satellite, satellite => satellite.users, {eager: true})
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

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
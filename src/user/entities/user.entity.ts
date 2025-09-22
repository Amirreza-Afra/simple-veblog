import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum/user.role.enum";

@Entity({name : 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true})
    username : string;

    @Exclude()
    @Column()
    password : string;
    
    @Column({type: 'text',nullable : true}) //type
    tokenHash?: string | null;

    @Exclude()
    @Column({default : true})
    isActivate: boolean;

    @Column({type : 'enum' , enum : UserRole , default : UserRole.USER})
    role: UserRole;

}
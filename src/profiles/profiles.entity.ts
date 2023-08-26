import { User } from "../users/users.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 200 })
    bio: string;

    @Column('date')
    birthday: string;

    @Column('text')
    photo: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
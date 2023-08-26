import { User } from "../users/users.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 200, nullable: true })
    bio: string;

    @Column('date', { nullable: true })
    birthday: string;

    @Column('text', { nullable: true })
    photo: string;

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn()
    user: User;
}
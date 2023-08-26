import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Profile {

    @Column('varchar', { length: 200 })
    bio: string;

    @Column('date')
    birthday: string;

    @Column('text')
    profile_picture: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
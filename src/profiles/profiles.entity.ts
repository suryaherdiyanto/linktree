import { Column, Entity } from "typeorm";

@Entity()
export class Profile {

    @Column('varchar', { length: 200 })
    bio: string;

    @Column('date')
    birthday: string;

    @Column('text')
    profile_picture: string;
}
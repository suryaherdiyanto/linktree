import { BeforeInsert, Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Profile } from "./profiles.entity";
import { Social } from "./socials.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 30 })
    @Index({ unique: true })
    username: string;

    @Column('varchar', { length: 50 })
    @Index({ unique: true })
    email: string;

    @Column('varchar')
    password: string;

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;

    @OneToMany(() => Social, (social) => social.user)
    socials: Social[];

    @BeforeInsert()
    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}

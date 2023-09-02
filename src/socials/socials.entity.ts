import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

enum socials {
    FACEBOOK = 'facebook',
    TWITTER = 'twitter',
    INSTAGRAM = 'instagram',
    GITHUB = 'github',
    LINKEDIN = 'linkedin',
};

@Entity()
export class Social {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('enum')
    socialMedia: socials;

    @Column('text')
    url: string;

    @OneToOne(() => User, (user) => user.social)
    @JoinTable()
    user: User;

    @Column('timestamp')
    createdAt: string;

    @Column('timestamp')
    updatedAt: string;
}
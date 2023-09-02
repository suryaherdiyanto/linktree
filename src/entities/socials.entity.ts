import { User } from "./users.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ type: 'simple-enum', enum: socials })
    socialMedia: socials;

    @Column('text')
    url: string;

    @ManyToOne(() => User)
    @JoinTable()
    user: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
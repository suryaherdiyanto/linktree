import { User } from "./users.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum socials {
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

    @Column('varchar', { length: 50 })
    title: string;

    @Column({ type: 'simple-enum', enum: socials })
    socialMedia: socials;

    @Column('text')
    url: string;

    @ManyToOne(() => User, (user) => user.socials)
    @JoinTable()
    user: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
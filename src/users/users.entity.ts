import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

    @Column('string')
    name: string;

    @Column('string')
    @Index({ unique: true })
    username: string;

    @Column('string')
    @Index({ unique: true })
    email: string;

    @Column('string')
    password: string;
}
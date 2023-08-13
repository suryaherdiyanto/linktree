import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    @Index({ unique: true })
    username: string;

    @Column('varchar')
    @Index({ unique: true })
    email: string;

    @Column('varchar')
    password: string;
}
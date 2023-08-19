import { BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

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

    @BeforeInsert()
    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}

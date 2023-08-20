import { BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

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

    @BeforeInsert()
    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}

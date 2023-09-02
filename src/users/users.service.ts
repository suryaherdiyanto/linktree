import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    create(data: CreateUserDTO) {
        const user = this.repository.create(data);

        return this.repository.save(user);
    }

	findByEmail(email: string) {
		return this.repository.findOneBy({ email });
	}

	findByUsername(username: string) {
		return this.repository.findOneBy({ username });
	}
}

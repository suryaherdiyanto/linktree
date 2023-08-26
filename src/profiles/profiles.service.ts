import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profiles.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile) private repository: Repository<Profile>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async saveProfile(userId: string, bio: string, birthday: string, photo: string)
    {
        const user = await this.userRepository.findOneBy({ id: userId });
        const profile = this.repository.create({ user, bio, birthday, photo });

        return this.repository.save(profile);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profiles.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile) private repository: Repository<Profile>,
    ) {}

    async saveProfile(userId: string, bio: string, birthday: string, photo: string)
    {
        const profile = await this.repository.findOne({
            where: {
                user: {
                    id: userId
                }
            }
        });

        let createProfile: Partial<Profile>
        if (!profile) {
            createProfile = this.repository.create({user: { id: userId }, bio, birthday, photo})
        } else {
            createProfile = Object.assign(profile, {user: { id: userId }, bio, birthday, photo});
        }


        return this.repository.save(createProfile);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profiles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile) private repository: Repository<Profile>,
    ) {}

    async saveProfile(userId: string, bio: string|null, birthday: string|null, photo?: string|null)
    {
        const profile = await this.getProfile(userId);

        let createProfile: Partial<Profile>
        if (!profile) {
            createProfile = this.repository.create({user: { id: userId }, bio, birthday, photo})
        } else {
            createProfile = Object.assign(profile, {user: { id: userId }, bio, birthday });

            if (photo) {
                createProfile['photo'] = photo;
            }
        }


        return this.repository.save(createProfile);
    }

    async getProfile(userId: string)
    {
        return this.repository.findOne({
            where: {
                user: { id: userId }
            }
        });
    }
}

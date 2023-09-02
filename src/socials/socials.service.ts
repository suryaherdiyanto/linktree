import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Social, socials } from '../entities/socials.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocialsService {
    constructor(@InjectRepository(Social) private repository: Repository<Social>) {}

    saveSocial(userId: string, socialMedia: socials, url: string)
    {
        const social = this.repository.create({ user: { id: userId }, socialMedia, url });
        return this.repository.save(social);
    }
}

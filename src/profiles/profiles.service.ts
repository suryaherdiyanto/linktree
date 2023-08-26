import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profiles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private repository: Repository<Profile>) {}
}

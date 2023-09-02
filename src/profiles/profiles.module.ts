import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../entities/profiles.entity';
import { User } from '../entities/users.entity';
import { StorageModule } from '../storage/storage.module';
import { Social } from '../entities/socials.entity';

@Module({
  providers: [ProfilesService],
  controllers: [ProfilesController],
  imports: [TypeOrmModule.forFeature([Profile, User, Social]), StorageModule]
})
export class ProfilesModule {}

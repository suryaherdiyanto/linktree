import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profiles.entity';
import { User } from '../users/users.entity';
import { StorageModule } from '../storage/storage.module';

@Module({
  providers: [ProfilesService],
  controllers: [ProfilesController],
  imports: [TypeOrmModule.forFeature([Profile, User]), StorageModule]
})
export class ProfilesModule {}

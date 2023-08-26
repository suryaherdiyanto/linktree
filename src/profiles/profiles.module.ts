import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profiles.entity';
import { User } from '../users/users.entity';

@Module({
  providers: [ProfilesService],
  controllers: [ProfilesController],
  imports: [TypeOrmModule.forFeature([Profile, User])]
})
export class ProfilesModule {}

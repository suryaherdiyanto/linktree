import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Profile } from '../entities/profiles.entity';
import { Social } from '../entities/socials.entity';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Profile, Social])]
})
export class UsersModule {}

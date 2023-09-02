import { Module } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { SocialsController } from './socials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Social } from '../entities/socials.entity';
import { User } from '../entities/users.entity';
import { Profile } from '../entities/profiles.entity';

@Module({
  providers: [SocialsService],
  controllers: [SocialsController],
  imports: [TypeOrmModule.forFeature([User, Social, Profile])]
})
export class SocialsModule {}

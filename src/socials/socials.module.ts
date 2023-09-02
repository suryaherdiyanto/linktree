import { Module } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { SocialsController } from './socials.controller';

@Module({
  providers: [SocialsService],
  controllers: [SocialsController]
})
export class SocialsModule {}

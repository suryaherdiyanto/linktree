import { Test, TestingModule } from '@nestjs/testing';
import { SocialsService } from './socials.service';
import { SocialsModule } from './socials.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOption } from '../config/database.config';

describe('SocialsService', () => {
  let service: SocialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseOption), SocialsModule],
    }).compile();

    service = module.get<SocialsService>(SocialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

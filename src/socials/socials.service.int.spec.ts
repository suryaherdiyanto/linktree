import { Test, TestingModule } from '@nestjs/testing';
import { SocialsService } from './socials.service';
import { SocialsModule } from './socials.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { databaseOption } from '../config/database.config';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { Social, socials } from '../entities/socials.entity';
import { user } from '../users/stubs/users.stub';
import { log } from 'console';

describe('SocialsService', () => {
  let service: SocialsService;
  let userRepo: Repository<User>;
  let socialRepo: Repository<Social>;
  let userData: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseOption), SocialsModule],
    }).compile();

    service = module.get<SocialsService>(SocialsService);
    userRepo = module.get(getRepositoryToken(User));
    socialRepo = module.get(getRepositoryToken(Social));

    await userRepo.createQueryBuilder().insert().values([user]).execute();
    userData = (await userRepo.find({}))[0];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveSocials', () => {
    it('should create the social for user if doesnt exists', async () => {
        const saveSocial = await service.saveSocial(userData.id, socials.FACEBOOK, 'https://facebook.com/john.doe');
        expect(saveSocial.user.id).toBe(userData.id);
        expect(saveSocial.socialMedia).toBe('facebook');
        expect(saveSocial.url).toBe('https://facebook.com/john.doe');
    });
  })
});

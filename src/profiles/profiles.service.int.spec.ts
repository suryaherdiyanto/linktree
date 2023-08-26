import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Profile } from './profiles.entity';
import { users } from 'src/users/stubs/users.stub';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let userRepository: Repository<User>
  let profileRepository: Repository<Profile>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesService],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
    userRepository = module.get(getRepositoryToken(User));
    profileRepository = module.get(getRepositoryToken(Profile));

    await userRepository.createQueryBuilder().insert().values(users).execute();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('updateProfile', () => {
    it('should create a new profile for the user if does not exists', async () => {
    })
    it('should update the profile of the user', async () => {
    })
  })
});
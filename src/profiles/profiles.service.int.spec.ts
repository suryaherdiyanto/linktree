import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { Profile } from '../entities/profiles.entity';
import { users } from '../users/stubs/users.stub';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { databaseOption } from '../config/database.config';
import { Social } from '../entities/socials.entity';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let userRepository: Repository<User>
  let profileRepository: Repository<Profile>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(databaseOption),
        TypeOrmModule.forFeature([User, Profile, Social])
      ],
      providers: [ProfilesService]
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
    userRepository = module.get(getRepositoryToken(User));
    profileRepository = module.get(getRepositoryToken(Profile));

    await userRepository.createQueryBuilder().insert().values(users).execute();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should define the profile repository', () => {
    expect(profileRepository).toBeDefined();
  })
  describe('updateProfile', () => {
    it('should create a new profile for the user if does not exists', async () => {
      const user = (await userRepository.find())[0];

      expect(await service.saveProfile(user.id, 'being me', '1990-03-12', 'me.jpg')).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          birthday: '1990-03-12',
          bio: 'being me',
          photo: 'me.jpg'
        })
      );
    })
    it('should update the profile of the user', async () => {
      const user = (await userRepository.find())[1];
      await profileRepository.save({ birthday: '1992-01-01', bio: 'waaw', photo: 'me.jpg', user});

      expect(await service.saveProfile(user.id, 'new bio', '1995-01-01','new-me.jpg')).toEqual(
        expect.objectContaining({
        id: expect.any(String),
        birthday: '1995-01-01',
        bio: 'new bio',
        photo: 'new-me.jpg'
      })
      )
    });
  });
  describe('getProfile', () => {
    it('should return null if no user in database', async () => {
      expect(await service.getProfile('nouser')).toBe(null);
    });
    it('should be return the profile of the user', async () => {
      const user = (await userRepository.find())[1];
      const profile = await profileRepository.save({ birthday: '1992-01-01', bio: 'waaw', photo: 'me.jpg', user});

      expect(await service.getProfile(user.id)).toEqual({
        id: expect.any(String),
        bio: profile.bio,
        birthday: profile.birthday,
        photo: profile.photo
      })
    })
  })
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { databaseOption } from '../config/database.config';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { user, users } from './stubs/users.stub';
import * as bcrypt from 'bcrypt';
import { ConfigModule } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let singleUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(databaseOption),
        UsersModule,
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));

    await repository.createQueryBuilder().insert().values(users).execute();
    singleUser = await repository.findOneBy({ email: users[0].email });

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create()', function() {
    it('should be able to create a new user with the valid input and retrieve its email', async () => {
      expect((await service.create(user)).email).toBe(user.email);
    });
    it('should encrypt the password field', async () => {
      const createdUser = await service.create(user);
      expect(await bcrypt.compare(user.password, createdUser.password)).toBeTruthy();
    });
  });

  describe('findByEmail', function() {
    it('should be able to find the user based on the email', async function() {
      expect(await service.findByEmail(users[0].email)).toEqual(
        expect.objectContaining({ id: expect.any(String), email: users[0].email, username: users[0].username })
      );
    });
    it('should return null if the email was not found in database', async function() {
      expect(await service.findByEmail('carla@indi.com')).toBe(null);
    });
  });

  describe('findByUsername', function() {
    it('should be able to find the user based on the username', async function() {
      expect(await service.findByUsername(users[0].username)).toEqual(
        expect.objectContaining({ id: expect.any(String), email: users[0].email, username: users[0].username })
      );
    });
    it('should return null if the email was not found in database', async function() {
      expect(await service.findByUsername('dragon45')).toBe(null);
    });
  });

  describe('updateToken', function() {
    it('should be able to update user\'s access token', async function() {
      await service.updateToken(singleUser.id, 'thetoken');
      const user = (await repository.findOneBy({ id: singleUser.id }));

      expect(user.access_token).toBe('thetoken');
    })
  })
});

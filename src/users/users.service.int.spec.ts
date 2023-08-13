import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { databaseOption } from '../config/database.config';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { user, users } from './stubs/users.stub';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(databaseOption),
        UsersModule,
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));

    await repository.createQueryBuilder().insert().values(users).execute();
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
  })
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {user, users} from '../src/users/stubs/users.stub';
import {getRepositoryToken, TypeOrmModule} from '@nestjs/typeorm';
import {databaseOption} from '../src/config/database.config';
import {Repository} from 'typeorm';
import {User} from '../src/users/users.entity';
import { ProfilesModule } from '../src/profiles/profiles.module';
import * as Jwt from 'jsonwebtoken';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProfilesModule,
        TypeOrmModule.forRoot(databaseOption)
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = app.get(getRepositoryToken(User));

    userRepository.createQueryBuilder().insert().values(users).execute();
    token = Jwt.sign(users[0], 'verysecretkey');
      await app.init();
    });

  describe('/profiles/update (POST)', () => {
	  it('it should return 400 error if jwt token are not provided', async () => {
      const response = await request(app.getHttpServer())
        .put('/profiles/update')
        .send(user);

        expect(response.statusCode).toBe(401);
	  });
  });
});

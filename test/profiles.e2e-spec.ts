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
  let user: User;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProfilesModule,
        TypeOrmModule.forRoot(databaseOption)
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = app.get(getRepositoryToken(User));

    await userRepository.createQueryBuilder().insert().values(users).execute();
    user = (await userRepository.find())[0];

    token = Jwt.sign({ id: user.id, email: user.email, username: user.username }, 'verysecretkey');
      await app.init();
    });

  describe('/profiles/update (POST)', () => {
	  it('it should return 400 error if jwt token are not provided', async () => {
      const response = await request(app.getHttpServer())
        .put('/profiles/update')
        .send({});

        expect(response.statusCode).toBe(401);
	  });
    it('it should able to create the a profile for the user', async () => {
      const response = await request(app.getHttpServer())
          .put('/profiles/update')
          .send({ userId: user.id, bio: 'Im a hero', 'birthday': '1998-01-01' })
          .set('Authorization', 'Bearer '+token)

      expect(response.statusCode).toBe(200);
      expect(response.body.user.id).toBe(user.id);
      expect(response.body.bio).toBe('Im a hero');
      expect(response.body.birthday).toBe('1998-01-01');
    })
  });
});

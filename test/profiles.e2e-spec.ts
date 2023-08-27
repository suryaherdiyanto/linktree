import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {users} from '../src/users/stubs/users.stub';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../src/users/users.entity';
import * as Jwt from 'jsonwebtoken';
import { AppModule } from '../src/app.module';
import { Profile } from '../src/profiles/profiles.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let profileRepository: Repository<Profile>;
  let token: string;
  let user: User;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = app.get(getRepositoryToken(User));
    profileRepository = app.get(getRepositoryToken(Profile));

    await userRepository.createQueryBuilder().insert().values(users).execute();
    user = (await userRepository.find())[0];
    await profileRepository.save({ user, bio: 'bio', birthday: '1991:02:01', photo: 'me.jpg' });

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
    });
    it('should not updated the photo field if no file uploaded', async () => {
      const response = await request(app.getHttpServer())
          .put('/profiles/update')
          .send({ userId: user.id, bio: 'Im a hero', 'birthday': '1998-01-01' })
          .set('Authorization', 'Bearer '+token);

          expect(response.body.photo).toBe('me.jpg');
    })
  });
});

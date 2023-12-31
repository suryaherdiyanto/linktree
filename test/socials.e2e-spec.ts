import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {users} from '../src/users/stubs/users.stub';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../src/entities/users.entity';
import * as Jwt from 'jsonwebtoken';
import { Social, socials } from '../src/entities/socials.entity';
import { AppModule } from '../src/app.module';

describe('SocialsController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let socialRepository: Repository<Social>;
  let token: string;
  let user: User;
  let social: Social;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = app.get(getRepositoryToken(User));
    socialRepository = app.get(getRepositoryToken(Social));

    await userRepository.createQueryBuilder().insert().values(users).execute();
    user = (await userRepository.find())[0];
    social = await socialRepository.save({ user, title: 'Add me on facebook', socialMedia: socials.FACEBOOK, url: 'https://facebook.com/john.doe' });

    token = Jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'verysecretkey');
      await app.init();
    });

  describe('/socials/create (POST)', () => {
	it('it should return 400 error if jwt token are not provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/socials/create')
        .send({});

        expect(response.statusCode).toBe(401);
	});

    it('should return validation error when user input social other social media', async () => {
      const response = await request(app.getHttpServer())
        .post('/socials/create')
        .set('Authorization', 'Bearer '+token)
        .send({ title: 'Watch me on twitch', social_media: 'twitch', url: 'https://twitch.tv/john'});

        console.log(response.body);

        expect(response.statusCode).toBe(422);
        expect(response.body.errors.social_media).toBeDefined();
    });
    it('should able to create a social media with valid input', async () => {
        const response = await request(app.getHttpServer())
            .post('/socials/create')
            .set('Authorization', 'Bearer '+token)
            .send({ title: 'Follow me on instagram', social_media: 'instagram', url: 'https://instagram.com/john'});

        expect(response.statusCode).toBe(201);
        expect(response.body.data.user.id).toBe(user.id);
        expect(response.body.data.socialMedia).toBe('instagram');
        expect(response.body.message).toBeDefined();
    });
    it('should able to delete social media', async () => {
        const response = await request(app.getHttpServer())
            .delete('/socials/delete/'+social.id)
            .set('Authorization', 'Bearer '+token);

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(await socialRepository.findOneBy({ title: 'Add me on facebook' })).toBeNull();
        expect(response.body.message).toBeDefined();
    })
  });
});

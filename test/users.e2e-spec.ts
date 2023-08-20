import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {user, users} from '../src/users/stubs/users.stub';
import {UsersModule} from '../src/users/users.module';
import {getRepositoryToken, TypeOrmModule} from '@nestjs/typeorm';
import {databaseOption} from '../src/config/database.config';
import {Repository} from 'typeorm';
import {User} from '../src/users/users.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
		  UsersModule,
		  TypeOrmModule.forRoot(databaseOption)
	  ],
    }).compile();

    app = moduleFixture.createNestApplication();
	userRepository = app.get(getRepositoryToken(User));

	userRepository.createQueryBuilder().insert().values(users).execute();
    await app.init();
  });

  describe('/users/register (POST)', () => {
	  it('should able to create user with valid inputs', () => {
		return request(app.getHttpServer())
		  .post('/users/register')
		  .send(user)
		  .expect(201)
		  .then(response => {
			  expect(response.body.data.email).toBe(user.email);
			  expect(response.body.data.username).toBe(user.username);
			  expect(response.body.data.id).not.toBeDefined();
			  expect(response.body.data.password).not.toBeDefined();
		  });
	  });

	  it('should return 400 error if the email already used', () => {
		  return request(app.getHttpServer())
					.post('/users/register')
					.send({ username: 'abcdef', email: 'dragon@gmail.com', password: 'secretpassword', name: 'John' })
					.expect(400);
	  });

	  it('should return 400 error if the username already used', () => {
		  return request(app.getHttpServer())
					.post('/users/register')
					.send({ username: 'hang', email: 'johndoe@gmail.com', password: 'secretpassword', name: 'John' })
					.expect(400);
	  });

	  it('should return 400 error if the password confirmation invalid', () => {
		  return request(app.getHttpServer())
					.post('/users/register')
					.send({ username: 'john123', email: 'johndoe@gmail.com', password: 'secretpassword', password_confirmation: '', name: 'John' })
					.expect(400);
	  });
  });

  describe('/users/login (POST)', () => {
	it('should be able to login with valid email and password', async () => {
		const response = await request(app.getHttpServer()).post('/users/login').send({ email: 'dragon@gmail.com', password: 'secret' });

		console.log(response.body);

		expect(response.statusCode).toBe(200);
		expect(response.body.token).toBeDefined();
	});

	it('should not be able to login if the email invalid', async () => {
		const response = await request(app.getHttpServer()).post('/users/login').send({ email: 'dragonball@gmail.com', password: 'secret' });

		console.log(response.body);

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to login if the password invalid', async () => {
		const response = await request(app.getHttpServer()).post('/users/login').send({ email: 'dragon@gmail.com', password: 'secret123' });

		console.log(response.body);

		expect(response.statusCode).toBe(400);
	});
  })
});

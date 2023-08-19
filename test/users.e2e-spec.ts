import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {user} from '../src/users/stubs/users.stub';
import {UsersModule} from '../src/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {databaseOption} from '../src/config/database.config';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
		  UsersModule,
		  TypeOrmModule.forRoot(databaseOption)
	  ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/users/register')
	  .send(user)
      .expect(201)
      .then(response => {
		  expect(response.body.data.email).toBe(user.email);
		  expect(response.body.data.username).toBe(user.username);
	  })
  });
});

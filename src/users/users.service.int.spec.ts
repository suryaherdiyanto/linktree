import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOption } from '../config/database.config';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot(databaseOption)
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

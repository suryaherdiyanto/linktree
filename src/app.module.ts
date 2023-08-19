import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOption } from './config/database.config';
import {APP_PIPE} from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(databaseOption)
  ],
  controllers: [AppController],
  providers: [
	  AppService,
	  {
		  provide: APP_PIPE,
		  useValue: new ValidationPipe({ whitelist: true })
	  }
  ],
})
export class AppModule {}

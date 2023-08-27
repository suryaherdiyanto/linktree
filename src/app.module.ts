import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOption } from './config/database.config';
import {APP_PIPE} from '@nestjs/core';
import { ProfilesModule } from './profiles/profiles.module';
import { ConfigModule } from '@nestjs/config';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseOption),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProfilesModule,
    StorageModule
  ],
  controllers: [AppController],
  providers: [
	  AppService,
	  {
		  provide: APP_PIPE,
		  useValue: new ValidationPipe({ whitelist: true })
	  },
  ],
})
export class AppModule {}

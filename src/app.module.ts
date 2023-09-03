import { Module, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOption } from './config/database.config';
import {APP_PIPE} from '@nestjs/core';
import { ProfilesModule } from './profiles/profiles.module';
import { ConfigModule } from '@nestjs/config';
import { StorageModule } from './storage/storage.module';
import { SocialsModule } from './socials/socials.module';
import { ValidationError } from 'class-validator';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseOption),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProfilesModule,
    StorageModule,
    SocialsModule
  ],
  controllers: [AppController],
  providers: [
	  AppService,
	  {
		  provide: APP_PIPE,
		  useValue: new ValidationPipe(
        {
          whitelist: true,
          validationError: { value: false },
          exceptionFactory: (errors: ValidationError[]) => {
            let validationErrors = [];
            errors.forEach((error) => {
              validationErrors[error.property] = Object.values(error.constraints);
            });
            console.log(validationErrors);


            return new UnprocessableEntityException({ message: "Unprocessable entity", errors: { ...validationErrors } });
          }
        })
	  },
  ],
})
export class AppModule {}

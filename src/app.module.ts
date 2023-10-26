import { Module, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {APP_PIPE} from '@nestjs/core';
import { ProfilesModule } from './profiles/profiles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StorageModule } from './storage/storage.module';
import { SocialsModule } from './socials/socials.module';
import { ValidationError } from 'class-validator';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if (process.env.NODE_ENV === 'test') {
          return ({
            type: 'sqlite',
            synchronize: true,
            database: ':memory:',
            autoLoadEntities: true
          });
        }

        return ({
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: 3306,
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: ['./entities/*.entity.ts'],
          synchronize: configService.get<string>('NODE_ENV') === 'production' ? false:true,
          ssl: configService.get<string>('NODE_ENV') === 'production' ? {
            rejectUnauthorized: true
          } : false
        })
      }
    }),
    UsersModule,
    ProfilesModule,
    StorageModule,
    SocialsModule,
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

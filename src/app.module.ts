import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOption } from './config/database.config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(databaseOption)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

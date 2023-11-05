import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as FileStore from 'session-file-store';

const fileStore = FileStore(session);
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost:3000']
    }
  });

  app.use(session({
    store: new fileStore(),
    secret: 'secret-session-key',
    saveUninitialized: false,
    resave: false
  }));
  await app.listen(3000);
}
bootstrap();

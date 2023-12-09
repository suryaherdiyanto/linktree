import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as FileStore from 'session-file-store';
import { join } from 'path';

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
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'resources/views'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();

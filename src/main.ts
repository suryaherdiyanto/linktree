import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as FileStore from 'session-file-store';

const fileStore = FileStore(session);
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { createServer } = await import("vite");
  const viteServer = await createServer({ appType: 'custom', server: { middlewareMode: true } });

  app.use(viteServer.middlewares);

  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.setViewEngine('hbs');

  app.use(session({
    store: new fileStore(),
    secret: 'secret-session-key',
    saveUninitialized: false,
    resave: false
  }));
  await app.listen(3000);
}
bootstrap();

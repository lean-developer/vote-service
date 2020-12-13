import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap2() {
  const whitelist = ['http://localhost:8080', 'https://vote-alpha.vercel.app'];
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    // TODO: allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    // TODO: methods: "GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });
  try {
    await app.listen(process.env.PORT || 3200);
  }
  catch (e) {
    console.error(e);
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3200);
}
bootstrap();

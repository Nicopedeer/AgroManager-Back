import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.DB_port

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(loggerMiddleware)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const swaggerConfig = new DocumentBuilder()
  .setTitle("AgroManager")
  .setDescription("")
  .setVersion("1.0.0")
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("api", app, document)

  await app.listen(PORT || 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
const PORT = process.env.DB_port
import * as cors from "cors"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(loggerMiddleware)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.use(cors())

  const swaggerConfig = new DocumentBuilder()
  .setTitle("AgroManager")
  .setDescription("")
  .setVersion("1.0.0")
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("api", app, document)

  await app.listen(process.env.APP_port);

}
bootstrap();

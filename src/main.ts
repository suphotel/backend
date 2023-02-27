import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './providers/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

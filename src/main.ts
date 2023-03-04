import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './providers/prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Suphotel API')
    .setDescription('The Suphotel API description')
    .setVersion('1.0')
    .addTag('suphotel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

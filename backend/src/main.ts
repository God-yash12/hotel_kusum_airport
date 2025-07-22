import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

app.enableCors({
  origin: configService.get<string>('FRONTEND_URL') || 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Accept, X-CSRF-Token, Origin',
  preflightContinue: true,
  optionsSuccessStatus: 204,

})
app.useGlobalPipes(new ValidationPipe({
   whitelist: true,
    stopAtFirstError: true,
    transform: true,
    forbidNonWhitelisted: true,
    validationError: {target: false, value: false},
}))

const config = new DocumentBuilder()
  .setTitle('Hotel Kusum API')
  .setDescription('API documentation for Hotel Kusum')
  .setVersion('1.0')
  .addBearerAuth()
  .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  const dataSource = app.get(DataSource);

  if(dataSource.isInitialized) {
    console.log('Database connection is established.');
  }

  const port = configService.get<number>('PORT') || 3000;
  console.log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();

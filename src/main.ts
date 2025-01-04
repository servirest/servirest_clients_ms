import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';


async function bootstrap() {
  const logger = new Logger('People-Management-Service');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServer
      }
    },
  );
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  //app.setGlobalPrefix('clients')
  //app.enableCors();
  await app.listen();
  logger.log(`People-Management-Microservice is listening on ${envs.natsServer}`);
}
bootstrap();

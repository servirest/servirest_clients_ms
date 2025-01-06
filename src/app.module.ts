import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { AuthModule } from './auth/auth.module';
import { envs } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos
      url: envs.postgres.url,
      autoLoadEntities: true, //solo en desarrollo
      synchronize: true,
    }),

    PeopleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { envs } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',  // Tipo de base de datos
      host : envs.postgres.host,
      port :  envs.postgres.port,
      username : envs.postgres.username,
      password : envs.postgres.password,
      database : envs.postgres.database,
      autoLoadEntities : true, //solo en desarrollo
      //entities: [User], usar en producción
      synchronize: true,  
/*    Usar en producción   
      extra : { 
        ssl : process.env.POSTGRES_SSL === 'true' 
        ?{
          rejectUnauthorized : false
        }:null
        
      } */
     
    }),
    ConfigModule.forRoot({
      envFilePath: '.env', // Ruta del archivo .env
      isGlobal: true, // Hacer que las variables de entorno estén disponibles globalmente
    }),
    PeopleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

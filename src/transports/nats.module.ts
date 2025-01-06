import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { envs, services } from "src/config";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: services.NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServer,
        }
      },
    ])
  ],
  exports:[
    ClientsModule.register([
      {
        name: services.NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServer,
        }
      },
    ])
  ]
})
export class NatsModule {}


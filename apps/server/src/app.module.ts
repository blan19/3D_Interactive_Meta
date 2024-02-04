import { Module } from "@nestjs/common";
import { EventsGateway } from "./events/events.gateway";

@Module({
  imports: [EventsGateway],
})
export class AppModule {}

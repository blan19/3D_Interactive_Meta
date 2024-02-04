import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log("---- gateway init! ----");
  }

  handleConnection(client: Socket) {
    this.logger.log("---- client connected! ----");
    console.log(client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log("---- client disconnected! ----");
    console.log(client.id);
  }

  @SubscribeMessage("onboarding")
  handleMessage(client: Socket, payload: any) {
    console.log(client);
    return {
      event: "join",
      data: {
        message: "hello world..!",
      },
    };
  }
}

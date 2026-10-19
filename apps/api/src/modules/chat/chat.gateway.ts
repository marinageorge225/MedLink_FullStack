import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('join_room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    client.join(data.roomId);
    return { event: 'joined_room', data: data.roomId };
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { senderId: string; receiverId: string; message: string; roomId: string },
  ) {
    const saved = await this.chatService.saveMessage(
      data.senderId,
      data.receiverId,
      data.message,
    );

    if (data.roomId) {
      this.server.to(data.roomId).emit('new_message', saved);
    } else {
      this.server.emit('new_message', saved);
    }

    return saved;
  }
}

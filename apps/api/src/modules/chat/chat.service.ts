import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(senderId: string, receiverId: string, message: string) {
    return this.prisma.chatMessage.create({
      data: {
        senderId,
        receiverId,
        message,
      },
    });
  }

  async getMessages(user1: string, user2: string) {
    return this.prisma.chatMessage.findMany({
      where: {
        OR: [
          { senderId: user1, receiverId: user2 },
          { senderId: user2, receiverId: user1 },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}

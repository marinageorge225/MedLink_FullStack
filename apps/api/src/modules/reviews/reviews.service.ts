import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async findByDoctor(doctorId: string) {
    return this.prisma.review.findMany({
      where: { doctorId },
      include: {
        patient: {
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

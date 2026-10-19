import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async getSpecialties() {
    return this.prisma.specialty.findMany({
      include: {
        _count: {
          select: { doctors: true },
        },
      },
    });
  }
}

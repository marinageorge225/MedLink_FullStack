import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getPendingDoctors() {
    return this.prisma.doctorProfile.findMany({
      where: { isVerified: false },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        specialty: true,
      },
    });
  }

  async verifyDoctor(doctorId: string) {
    return this.prisma.doctorProfile.update({
      where: { id: doctorId },
      data: { isVerified: true },
    });
  }
}

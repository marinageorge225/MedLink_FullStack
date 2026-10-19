import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(specialtyId?: string) {
    return this.prisma.doctorProfile.findMany({
      where: {
        isVerified: true,
        specialtyId: specialtyId || undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        specialty: true,
      },
    });
  }

  async findById(id: string) {
    const doctor = await this.prisma.doctorProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            avatarUrl: true,
          },
        },
        specialty: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}

  async findByPatient(patientId: string) {
    return this.prisma.prescription.findMany({
      where: { patientId },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            specialty: true,
          },
        },
        items: true,
      },
      orderBy: { issuedAt: 'desc' },
    });
  }
}

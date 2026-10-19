import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getPlatformStats() {
    const [totalUsers, totalDoctors, totalAppointments, totalRevenue] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.doctorProfile.count({ where: { isVerified: true } }),
        this.prisma.appointment.count(),
        this.prisma.payment.aggregate({
          where: { status: 'PAID' },
          _sum: { amount: true },
        }),
      ]);

    return {
      totalUsers,
      totalDoctors,
      totalAppointments,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }
}

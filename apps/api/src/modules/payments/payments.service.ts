import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentStatus, PaymentMethod } from '@medlink/shared';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async processPayment(appointmentId: string, amount: number, paymentMethod: PaymentMethod) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return this.prisma.payment.upsert({
      where: { appointmentId },
      update: {
        status: PaymentStatus.PAID,
        amount,
        paymentMethod,
        transactionRef: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      },
      create: {
        appointmentId,
        amount,
        status: PaymentStatus.PAID,
        paymentMethod,
        transactionRef: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      },
    });
  }

  async getPaymentByAppointment(appointmentId: string) {
    return this.prisma.payment.findUnique({
      where: { appointmentId },
    });
  }
}

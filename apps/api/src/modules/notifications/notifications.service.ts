import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationType } from '@medlink/shared';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  async getUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  // Scheduled task: Run every hour to check upcoming appointments and dispatch reminders
  @Cron(CronExpression.EVERY_HOUR)
  async handleAppointmentReminders() {
    this.logger.log('Running scheduled check for upcoming appointment reminders...');

    const upcomingTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours ahead
    const now = new Date();

    const upcomingAppointments = await this.prisma.appointment.findMany({
      where: {
        scheduledAt: {
          gte: now,
          lte: upcomingTime,
        },
        status: 'CONFIRMED',
      },
      include: {
        patient: {
          include: { user: true },
        },
      },
    });

    for (const appt of upcomingAppointments) {
      await this.prisma.notification.create({
        data: {
          userId: appt.patient.userId,
          type: NotificationType.APPOINTMENT_REMINDER,
          title: 'Upcoming Appointment Reminder',
          message: `You have an appointment scheduled for ${appt.scheduledAt.toLocaleTimeString()}.`,
        },
      });
    }

    this.logger.log(`Dispatched reminders for ${upcomingAppointments.length} appointments.`);
  }
}

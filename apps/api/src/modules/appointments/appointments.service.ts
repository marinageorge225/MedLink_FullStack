import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentInput, UpdateAppointmentStatusInput, AppointmentStatus } from '@medlink/shared';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateAppointmentInput) {
    const patientProfile = await this.prisma.patientProfile.findUnique({
      where: { userId },
    });

    if (!patientProfile) {
      throw new BadRequestException('Only registered patients can book appointments');
    }

    const doctor = await this.prisma.doctorProfile.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return this.prisma.appointment.create({
      data: {
        patientId: patientProfile.id,
        doctorId: doctor.id,
        scheduledAt: new Date(data.scheduledAt),
        durationMinutes: data.durationMinutes || 30,
        reason: data.reason,
        status: AppointmentStatus.PENDING,
      },
    });
  }

  async findByPatient(userId: string) {
    const patient = await this.prisma.patientProfile.findUnique({
      where: { userId },
    });

    if (!patient) return [];

    return this.prisma.appointment.findMany({
      where: { patientId: patient.id },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
            specialty: true,
          },
        },
      },
      orderBy: { scheduledAt: 'desc' },
    });
  }

  async updateStatus(id: string, data: UpdateAppointmentStatusInput) {
    return this.prisma.appointment.update({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes,
      },
    });
  }
}

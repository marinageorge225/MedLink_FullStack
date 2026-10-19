import { z } from 'zod';
import { AppointmentStatus } from '../enums';

export const createAppointmentSchema = z.object({
  doctorId: z.string().uuid('Invalid doctor ID format'),
  scheduledAt: z.string().datetime('Must be a valid ISO 8601 datetime string'),
  durationMinutes: z.number().int().positive().default(30),
  reason: z.string().max(500, 'Reason cannot exceed 500 characters').optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export const updateAppointmentStatusSchema = z.object({
  status: z.nativeEnum(AppointmentStatus),
  notes: z.string().max(1000).optional(),
});

export type UpdateAppointmentStatusInput = z.infer<typeof updateAppointmentStatusSchema>;

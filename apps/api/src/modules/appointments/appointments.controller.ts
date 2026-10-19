import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import {
  CreateAppointmentInput,
  UpdateAppointmentStatusInput,
  createAppointmentSchema,
  updateAppointmentStatusSchema,
} from '@medlink/shared';
import { ZodValidationPipe } from '../../common/pipes/validation.pipe';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Book a new doctor appointment' })
  @UsePipes(new ZodValidationPipe(createAppointmentSchema))
  async create(
    @CurrentUser('id') userId: string,
    @Body() body: CreateAppointmentInput,
  ) {
    return this.appointmentsService.create(userId, body);
  }

  @Get('my')
  @ApiOperation({ summary: 'List all appointments for authenticated user' })
  async getMyAppointments(@CurrentUser('id') userId: string) {
    return this.appointmentsService.findByPatient(userId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update appointment status (confirmed, cancelled, completed)' })
  @UsePipes(new ZodValidationPipe(updateAppointmentStatusSchema))
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateAppointmentStatusInput,
  ) {
    return this.appointmentsService.updateStatus(id, body);
  }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PrescriptionsService } from './prescriptions.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Prescriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private prescriptionsService: PrescriptionsService) {}

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get prescriptions for a patient' })
  async getByPatient(@Param('patientId') patientId: string) {
    return this.prescriptionsService.findByPatient(patientId);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@medlink/shared';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get('me')
  @Roles(UserRole.PATIENT)
  @ApiOperation({ summary: 'Get current patient profile' })
  async getMyProfile(@CurrentUser('id') userId: string) {
    return this.patientsService.getPatientProfile(userId);
  }
}

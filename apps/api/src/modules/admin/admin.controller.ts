import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@medlink/shared';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('doctors/pending')
  @ApiOperation({ summary: 'List pending unverified doctors' })
  async getPendingDoctors() {
    return this.adminService.getPendingDoctors();
  }

  @Patch('doctors/:id/verify')
  @ApiOperation({ summary: 'Verify doctor account' })
  async verifyDoctor(@Param('id') id: string) {
    return this.adminService.verifyDoctor(id);
  }
}

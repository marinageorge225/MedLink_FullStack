import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: 'List all verified doctors with optional specialty filter' })
  @ApiQuery({ name: 'specialtyId', required: false, type: String })
  async findAll(@Query('specialtyId') specialtyId?: string) {
    return this.doctorsService.findAll(specialtyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor profile details by ID' })
  async findById(@Param('id') id: string) {
    return this.doctorsService.findById(id);
  }
}

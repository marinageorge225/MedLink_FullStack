import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Get('specialties')
  @ApiOperation({ summary: 'List all medical specialties' })
  async getSpecialties() {
    return this.catalogService.getSpecialties();
  }
}

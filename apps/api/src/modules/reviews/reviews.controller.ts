import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('doctor/:doctorId')
  @ApiOperation({ summary: 'Get reviews for a doctor' })
  async getDoctorReviews(@Param('doctorId') doctorId: string) {
    return this.reviewsService.findByDoctor(doctorId);
  }
}

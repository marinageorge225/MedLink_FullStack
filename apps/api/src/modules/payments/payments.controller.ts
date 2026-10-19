import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PaymentMethod } from '@medlink/shared';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post(':appointmentId')
  @ApiOperation({ summary: 'Process payment for an appointment' })
  async pay(
    @Param('appointmentId') appointmentId: string,
    @Body() body: { amount: number; paymentMethod: PaymentMethod },
  ) {
    return this.paymentsService.processPayment(appointmentId, body.amount, body.paymentMethod);
  }

  @Get(':appointmentId')
  @ApiOperation({ summary: 'Get payment record for an appointment' })
  async getPayment(@Param('appointmentId') appointmentId: string) {
    return this.paymentsService.getPaymentByAppointment(appointmentId);
  }
}

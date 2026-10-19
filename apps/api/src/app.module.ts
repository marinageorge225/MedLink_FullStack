import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/configuration';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PatientsModule } from './modules/patients/patients.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { ChatModule } from './modules/chat/chat.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    DoctorsModule,
    CatalogModule,
    AppointmentsModule,
    PaymentsModule,
    PrescriptionsModule,
    ChatModule,
    NotificationsModule,
    ReviewsModule,
    ReportsModule,
    AdminModule,
  ],
})
export class AppModule {}

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Connected to MySQL database');
    } catch (err: any) {
      console.warn('⚠️  Database connection could not be established at startup (MySQL not running or unreachable). Ensure local MySQL service is running on port 3306 and DATABASE_URL is correct.');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

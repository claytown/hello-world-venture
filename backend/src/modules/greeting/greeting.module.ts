import { Module } from '@nestjs/common';
import { GreetingController } from './greeting.controller';
import { GreetingService } from './greeting.service';
import { PrismaService } from '../../config/prisma.service';

@Module({
  controllers: [GreetingController],
  providers: [GreetingService, PrismaService],
})
export class GreetingModule {}

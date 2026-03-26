import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { CreateGreetingDto } from './greeting.dto';

@Injectable()
export class GreetingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.greeting.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const greeting = await this.prisma.greeting.findUnique({ where: { id } });
    if (!greeting) throw new NotFoundException('Greeting not found');
    return greeting;
  }

  async create(dto: CreateGreetingDto) {
    return this.prisma.greeting.create({ data: { message: dto.message } });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.greeting.delete({ where: { id } });
  }
}

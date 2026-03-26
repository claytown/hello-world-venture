import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { GreetingService } from './greeting.service';
import { CreateGreetingDto } from './greeting.dto';

@Controller('api/greetings')
export class GreetingController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get()
  findAll() {
    return this.greetingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.greetingService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGreetingDto) {
    return this.greetingService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.greetingService.remove(id);
  }
}

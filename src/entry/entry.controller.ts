import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EntriesService } from './entry.service';
import { Entry } from './entities/entry.entity';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  getAll(): Promise<Entry[]> {
    return this.entriesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Entry> {
    return this.entriesService.findOne(id);
  }

  @Post()
  create(@Body() entryData: Partial<Entry>): Promise<Entry> {
    return this.entriesService.create(entryData);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() entryData: Partial<Entry>,
  ): Promise<Entry> {
    return this.entriesService.update(id, entryData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.entriesService.remove(id);
  }
}

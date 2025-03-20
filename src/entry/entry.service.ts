// src/entries/entries.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
  ) {}

  findAll(): Promise<Entry[]> {
    return this.entriesRepository.find();
  }

  findOne(id: number): Promise<Entry> {
    return this.entriesRepository.findOne({ where: { id } });
  }

  create(entry: Partial<Entry>): Promise<Entry> {
    const newEntry = this.entriesRepository.create(entry);
    return this.entriesRepository.save(newEntry);
  }

  async update(id: number, entry: Partial<Entry>): Promise<Entry> {
    await this.entriesRepository.update(id, entry);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.entriesRepository.delete(id);
  }
}

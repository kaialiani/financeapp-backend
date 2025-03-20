import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesService } from './entry.service';
import { EntriesController } from './entry.controller';
import { Entry } from './entities/entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  providers: [EntriesService],
  controllers: [EntriesController],
})
export class EntriesModule {}

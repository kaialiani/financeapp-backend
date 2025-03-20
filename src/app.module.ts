// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesModule } from './entry/entry.module';
import { CategoriesModule } from './category/category.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // For development only. Use migrations in production.
      migrations: ['dist/src/migrations/*{.ts,.js}'],
    }),
    EntriesModule,
    CategoriesModule,
  ],
})
export class AppModule {}

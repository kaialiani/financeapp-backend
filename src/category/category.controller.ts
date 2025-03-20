// src/categories/categories.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriesService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoriesService.create(categoryData);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() categoryData: Partial<Category>,
  ): Promise<Category> {
    return this.categoriesService.update(id, categoryData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.categoriesService.remove(id);
  }
}

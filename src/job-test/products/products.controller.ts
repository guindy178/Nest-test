import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client'; // Import Prisma Client

import { JwtAuthGuard } from 'src/auth/auth.jwtauthguard';
import { TransformInterceptor } from 'src/Interceptors/transform.interceptor';

// @UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post() 
  async create(@Body() userData: Prisma.ProductCreateInput) { 
    return this.productService.create(userData); 
  }
  @Get('/:id')
  async getProduct(@Param('id') id: string) { 
    return this.productService.getProduct(id); 
  }

  @Get()
  async getAllUsers() { 
    return this.productService.getAllUsers(); 
  }
  
  @Put('/:id')
  async update(@Param('id') id: string, @Body() userData: Prisma.ProductUpdateInput){
  return this.productService.update(id, userData)
  }
  @Delete('/:id')
  async delete(@Param('id') id: string){
    return this.productService.delete(id)
  }

}
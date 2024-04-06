import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRepository } from 'src/repository/users.repository';
import { Prisma } from '@prisma/client';
@Injectable()
export class ProductsUsercast {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly prisma: PrismaService
  ) {}
 async create(Data:Prisma.ProductCreateInput): Promise<Product>{
  try{
    return await this.productRepo.create(Data)
  }catch{

  }
 }

 async getProducts(): Promise<Product[]> {
  try{
    return await this.productRepo.getProducts();
  }catch{

  }
}
 async getProduct(id: string): Promise<Product> {
    try{
      return await this.productRepo.getProduct(id);
    }catch{

    }
  }
 async update(idNumber: number, currentDate: Date, data: Prisma.ProductUpdateInput)
 : Promise<Product>{
    try{
      return await this.productRepo.update(idNumber, currentDate, data)
    }catch{

    }
 }
 async remove(idNumber: number): Promise<Product>{
  try {
    return await this.productRepo.remove(idNumber)
  }catch{

  }
 }
}

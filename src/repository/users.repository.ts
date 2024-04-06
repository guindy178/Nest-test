import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

interface ProductRepositoryInterface {
    getProduct(id: string): Promise<Product>;
    update(idNumber: number, currentDate: Date, data: Prisma.ProductUpdateInput): Promise<Product>
    remove(idNumber: number): Promise<Product>
    create(Data: Prisma.ProductCreateInput): Promise<Product>
    getProducts(): Promise<Product[]> 
  }
  
  @Injectable()
  export class ProductRepository implements ProductRepositoryInterface {
    constructor(
      private readonly prisma: PrismaService){}

   async getProducts(): Promise<Product[]> {
    try{
      return await this.prisma.product.findMany({
        where: {
          active : true
        }
      });
    }catch{

    }
   }
   async create(Data: Prisma.ProductCreateInput): Promise<Product>{
    try{
      const newUser = await this.prisma.product.create({ data: Data }); 
      return newUser
    }catch{

    }
   }
  
   async remove(idNumber: number): Promise<Product> {
      try{

        const updatedUser = await this.prisma.product.update({
          where : {
            id: idNumber,
          },
          data:{ active: false}
        });
        return updatedUser;
      }catch{

      }
    }
   
    async update(idNumber: number, currentDate: Date, data: Prisma.ProductUpdateInput): Promise<Product> {
     try{
  
      const updatedUser = await this.prisma.product.update({
        where : {
          id: idNumber, 
        },
        data: {
          name: data.name,
          price: data.price,
          description: data.description,
          createdAt: currentDate,
          createdBy: data.createdBy,
        },
      });
 
      return updatedUser;
    } catch(error) {
      throw new Error(error.message);
     }
    }

    async  getProduct(id: string): Promise<Product> {
        try {
          const idNumber: number = parseInt(id, 10); 
          console.log(idNumber);
          const data = await this.prisma.product.findFirst({
            where: {
              id: idNumber, 
              active: true
            },
          });
          return data;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    }
  
  
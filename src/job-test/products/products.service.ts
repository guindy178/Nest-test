/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ProductsUsercast } from 'src/usecast/users.usecast';
@Injectable()
export class ProductsService {
 
  constructor(
    private readonly prisma: PrismaService,
    private readonly ProductUsercast: ProductsUsercast
  ) {}
  async delete(id: string){
    try {
      const idNumber: number = parseInt(id, 10);
      const response = await this.ProductUsercast.remove(idNumber)
      if (response) {
        return "ลบเสร็จสิ้น";
    }
    } catch(error) {
      throw new Error(error.message);
    }

  }
  async update(id: string,data: Prisma.ProductUpdateInput){
    try {
     
      const idNumber: number = parseInt(id, 10);
      const currentDate = new Date();
      const response = await this.ProductUsercast.update(idNumber, currentDate, data)
      console.log( response,'aws')
      return response;
    } catch(error) {
      throw new Error(error.message);
    }
  }
  
  async create(data: Prisma.ProductCreateInput) {

    const newData: Prisma.ProductCreateInput = {
      name: data.name,
      price: data.price,
      description: data.description,
      createdBy: data.createdBy,
      active: true,
    };
    const newUser = await this.ProductUsercast.create(newData)
    return newUser
  }

  async getProduct(id: string) {
    try {
      const datas = await this.ProductUsercast.getProduct(id)
      return datas
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAllUsers() {
    const productList = await this.ProductUsercast.getProducts()
    return productList
  }

}





import { Module } from '@nestjs/common';
import { ProductsUsercast } from './users.usecast';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsService } from 'src/job-test/products/products.service';
import { ProductRepository } from 'src/repository/users.repository';
@Module({
  imports: [PrismaModule],
  providers: [ProductsUsercast, ProductsService, ProductRepository],
  controllers: [],
})
export class UsecaseModule {}

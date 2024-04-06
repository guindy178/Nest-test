import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductRepository } from './users.repository';
import { ProductsService } from 'src/job-test/products/products.service';
import { ProductsUsercast } from 'src/usecast/users.usecast';
@Module({
  imports: [PrismaModule],
  providers: [ProductRepository, ProductsService, ProductsUsercast],
})
export class RepositoryModule {}

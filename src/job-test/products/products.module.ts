import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransformInterceptor } from 'src/Interceptors/transform.interceptor';
import { ProductRepository } from 'src/repository/users.repository';
import { ProductsUsercast } from 'src/usecast/users.usecast';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
@Module({
  imports: [PrismaModule],
  providers: [ProductsService, TransformInterceptor, ProductsUsercast, ProductRepository],
  controllers: [ProductsController],
})
export class productsModule {}

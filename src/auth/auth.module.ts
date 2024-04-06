import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt'
import { ProductsService } from 'src/job-test/products/products.service';
import { ProductsUsercast } from 'src/usecast/users.usecast';
import { ProductRepository } from 'src/repository/users.repository';
import { authController } from './auth.controller';
@Module({
  imports : [PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),],
  providers: [AuthService, ProductsService, ProductsUsercast, ProductRepository],
  controllers: [authController]
})
export class AuthModule {}

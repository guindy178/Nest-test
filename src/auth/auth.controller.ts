/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('api/auth')
@Controller()
export class authController {
  constructor(private readonly AuthService: AuthService) {}

  @Post()
  signIn(@Body() data: Prisma.ProductCreateInput){
    return this.AuthService.signIn(data);
  }
}

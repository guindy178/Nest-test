import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService) {}

  async signIn(data:  Prisma.ProductCreateInput) {
    try {
      if(data){
        const payload = { data };
        const access_token = await this.jwtService.signAsync(payload); 
        // console.log(data,'xx')
        return { access_token }; 
      }
    }catch (error) {
      throw new Error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ: " + error.message);
    }


  }
}
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AccessMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // ตรวจสอบการเข้าถึง Controller หรือ Route ที่ผู้ใช้กำลังเข้าถึง
    console.log(`Accessing controller: ${req.method} ${req.url}`);
    
    // ตรวจสอบการมีค่า Authorization ใน headers
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      // ดึงค่า token จาก headers
      const token = authorizationHeader.slice(7); // ตัดช่องว่างหลัง 'Bearer ' ออก
      console.log(`Token: ${token}`);
    } else {
      console.log('No token found in headers');
    }

    next();
  }
}

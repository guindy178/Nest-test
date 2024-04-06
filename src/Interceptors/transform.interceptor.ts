import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const response = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          timestamp: new Date(), // เพิ่ม timestamp ที่บอกเวลา
          data: Array.isArray(data) ? data : [data], // เปลี่ยนเป็นอาร์เรย์ถ้าไม่ใช่แล้วแสดงผลเป็น []
        };
        // ตรวจสอบว่า data.data นั้นเป็นอาร์เรย์หรือไม่ ถ้าใช่ก็ให้ return ค่านี้ต่อไป
        if (Array.isArray(data.data)) {
          return data;
        } else {
          return response;
        }
      }),
    );
  }
}

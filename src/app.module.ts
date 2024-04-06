import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { productsModule } from './job-test/products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccessMiddleware } from './middleware.ts/access.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './Interceptors/transform.interceptor';
import { UsecaseModule } from './usecast/usecase.module';
import { RepositoryModule } from './repository/repository.module';
@Module({
  imports: [
    PrismaModule,
    productsModule,
    AuthModule,
    UsecaseModule,
    RepositoryModule,
    ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,}],
  
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessMiddleware)
      .forRoutes('*'); // ปรับเปลี่ยนเป็นเส้นทาง (Route) ที่ต้องการตรวจสอบการเข้าถึง หรือใช้ '*' เพื่อใช้กับทุก Route
  }
}

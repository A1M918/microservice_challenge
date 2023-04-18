import { Module } from '@nestjs/common';
import { OrdersController } from './app.controller';
import { OrdersService } from './app.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { OrdersController } from './app.controller';
import { OrdersService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/orderservice'),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AppModule {}

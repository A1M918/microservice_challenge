import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceService } from './invoice/invoice.service';

@Module({
  imports: [],
  controllers: [OrdersController, InvoiceController],
  providers: [OrdersService, InvoiceService],
})
export class AppModule {}

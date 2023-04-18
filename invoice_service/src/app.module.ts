import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoicesController } from './app.controller';
import { InvoicesService } from './app.service';
import { Invoice, InvoiceSchema } from './schemas/Invoice.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/invoiceservice'),
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class AppModule {}

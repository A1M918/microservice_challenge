import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoicesController } from './app.controller';
import { InvoicesService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/invoiceservice')],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class AppModule {}

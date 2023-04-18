import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/CreateInvoice.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class InvoiceService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

  async create(
    createOrderDto: CreateInvoiceDto,
  ): Promise<CreateInvoiceDto | unknown> {
    const order = await this.client
      .send<string, CreateInvoiceDto>('createInvoice', createOrderDto)
      .toPromise();
    return order;
  }

  async sendInvoice(id: string): Promise<CreateInvoiceDto | unknown> {
    return await this.client
      .send<string, string>('sendInvoice', id)
      .toPromise();
  }

  async getInvoice(id: string): Promise<CreateInvoiceDto | unknown> {
    return await this.client.send<string, string>('getInvoice', id).toPromise();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Invoice } from './interfaces/Invoice.interface';
import { Invoice } from './schemas/Invoice.schema';
import { CreateInvoiceDto } from './dto/CreateInvoice.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateOrderDto } from './dto/CreateOrder.dto';

@Injectable()
export class InvoicesService {
  client: ClientProxy;
  constructor(
    @InjectModel('Invoice') private readonly invoiceRepo: Model<Invoice>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

  async findAll(): Promise<CreateInvoiceDto[]> {
    return this.invoiceRepo.find().exec();
  }

  async findOne(id: string): Promise<CreateInvoiceDto> {
    return this.invoiceRepo.findById(id).exec();
  }

  async findByOrderId(id: string): Promise<CreateInvoiceDto> {
    return this.invoiceRepo
      .findOne({
        orderId: id,
      })
      .exec();
  }

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const relatedOrder: CreateOrderDto | any = await this.getOrderById(
      createInvoiceDto.orderId,
    );

    if (!relatedOrder) return null;

    const newData = await this.invoiceRepo.findOneAndUpdate(
      { orderId: createInvoiceDto.orderId },
      {
        ...createInvoiceDto,
        invoiceId: Math.random() * 10000,
      },
      { upsert: true },
    );

    if (relatedOrder.status === 'Shipped') {
      return await this.sendInvoice(newData._id.toString());
    }

    return newData;
  }

  async sendInvoice(id: string): Promise<Invoice> {
    const invoice = await this.findOne(id);

    if (!invoice) return null;

    const relatedOrder: CreateOrderDto | any = await this.getOrderById(
      invoice.orderId,
    );

    if (relatedOrder.status !== 'Shipped') {
      return null;
    }
    return this.invoiceRepo
      .findByIdAndUpdate(id, { sentAt: new Date() }, { new: true })
      .exec();
  }

  async getOrderById(id: string): Promise<CreateOrderDto | unknown> {
    return this.client.send<string, string>('findOne', id).toPromise();
  }

  async update(
    id: string,
    createInvoiceDto: CreateInvoiceDto,
  ): Promise<CreateInvoiceDto> {
    return this.invoiceRepo
      .findByIdAndUpdate(id, createInvoiceDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CreateInvoiceDto> {
    return this.invoiceRepo.findByIdAndRemove(id).exec();
  }
}

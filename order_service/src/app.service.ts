import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateInvoiceDto } from './dto/CreateInvoice.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  client: ClientProxy;
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      return null;
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new this.orderModel(createOrderDto);
    await order.save();
    return order;
  }

  async updateStatus(Payload: Partial<CreateOrderDto>): Promise<Order> {
    const { id, status } = Payload;
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      return null;
    }

    order.status = status;
    await order.save();

    if (status === 'Shipped') {
      const relatedInvoice: CreateInvoiceDto | any = await this.client
        .send<string, string>('getInvoiceByOrderId', order._id.toString())
        .toPromise();

      if (relatedInvoice) {
        await this.client
          .send<string, string>('sendInvoice', relatedInvoice._id)
          .toPromise();
      }
    }

    return order;
  }

  async remove(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      return null;
    }
    return this.orderModel.findByIdAndUpdate(
      order._id,
      { deleted: true },
      { new: true },
    );
  }
}

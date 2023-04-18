import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
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

  async getAllOrders(): Promise<CreateOrderDto[] | unknown> {
    console.log('[getAllOrders]');
    return this.client.send<string, any>('getAllOrders', '').toPromise();
  }

  async findOne(id: string): Promise<CreateOrderDto | unknown> {
    console.log('[findOne]');
    const order = await this.client
      .send<string, string>('findOne', id)
      .toPromise();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderDto | unknown> {
    const order = await this.client
      .send<string, CreateOrderDto>('create', createOrderDto)
      .toPromise();
    return order;
  }

  async updateStatus(
    id: string,
    status: string,
  ): Promise<CreateOrderDto | unknown> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = await this.client
      .send<string, object>('updateStatus', { id, status })
      .toPromise();

    return updatedOrder;
  }

  async remove(id: string): Promise<CreateOrderDto | unknown> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return await this.client.send<string, string>('remove', id).toPromise();
  }

  // async processOrder(orderId: string): Promise<void> {
  //   const order = await this.orderModel.findById(orderId).exec();
  //   if (!order) {
  //     throw new NotFoundException('Order not found');
  //   }
  //   // Process the order asynchronously using Redis or any
  // }
}

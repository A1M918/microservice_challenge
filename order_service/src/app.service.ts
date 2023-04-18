import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/CreateOrder.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
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
    return order;
  }

  async remove(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.orderModel.findByIdAndUpdate(
      order._id,
      { deleted: true },
      { new: true },
    );
  }

  async processOrder(orderId: string): Promise<void> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    // Process the order asynchronously using Redis or any
  }
}

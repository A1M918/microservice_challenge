import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { OrdersService } from './app.service';
import { Order } from './schemas/order.schema';
import {
  Ctx,
  MessagePattern,
  RedisContext,
  Payload,
} from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('getAllOrders')
  async findAll(
    @Payload() payload: unknown,
    @Ctx() RedisContext,
  ): Promise<Order[]> {
    console.log({
      RedisContext,
      payload,
    });
    return this.ordersService.findAll();
  }

  @MessagePattern('findOne')
  async findOne(@Payload() id: string, @Ctx() RedisContext): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('create')
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('updateStatus')
  async updateStatus(
    @Payload() payload: Partial<CreateOrderDto>,
    @Ctx() RedisContext,
  ): Promise<Order> {
    return this.ordersService.updateStatus(payload);
  }

  @MessagePattern('remove')
  async remove(@Payload() id: string, @Ctx() RedisContext): Promise<Order> {
    return this.ordersService.remove(id);
  }
}

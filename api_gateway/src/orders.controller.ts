import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  async getAllOrders(): Promise<CreateOrderDto[] | unknown> {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CreateOrderDto | unknown> {
    return this.ordersService.findOne(id);
  }

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderDto | unknown> {
    const order = await this.ordersService.create(createOrderDto);
    return order;
  }

  @Put(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() payload: Partial<CreateOrderDto>,
  ): Promise<CreateOrderDto | unknown> {
    const order = await this.ordersService.updateStatus(id, payload.status);
    return order;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CreateOrderDto | unknown> {
    return this.ordersService.remove(id);
  }
}

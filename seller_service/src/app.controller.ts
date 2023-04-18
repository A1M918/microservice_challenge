import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InvoicesService } from './sellers.service';
import { CreateInvoiceDto } from './dto/create-seller.dto';

@Controller('sellers')
export class InvoicesController {
  constructor(private readonly sellersService: InvoicesService) {}

  @Get()
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.sellersService.create(createInvoiceDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createInvoiceDto: CreateInvoiceDto) {
    return this.sellersService.update(id, createInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellersService.remove(id);
  }
}
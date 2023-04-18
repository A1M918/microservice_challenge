import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/CreateInvoice.dto';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async create(
    @Body() invoiceDto: CreateInvoiceDto,
  ): Promise<CreateInvoiceDto | unknown> {
    const invoice = await this.invoiceService.create(invoiceDto);
    if (!invoice) {
      throw new HttpException(
        'Something went wrong. Please check if order exists.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return invoice;
  }

  @Post(':id')
  async remove(@Param('id') id: string): Promise<CreateInvoiceDto | unknown> {
    return this.invoiceService.sendInvoice(id);
  }

  @Get(':id')
  async getInvoice(
    @Param('id') id: string,
  ): Promise<CreateInvoiceDto | unknown> {
    return this.invoiceService.getInvoice(id);
  }
}

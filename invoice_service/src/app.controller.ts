import { Controller } from '@nestjs/common';
import { InvoicesService } from './app.service';
import { CreateInvoiceDto } from './dto/CreateInvoice.dto';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class InvoicesController {
  constructor(private readonly invoiceService: InvoicesService) {}

  @MessagePattern('createInvoice')
  async createInvoice(
    @Payload() payload: CreateInvoiceDto,
    @Ctx() redisContex,
  ): Promise<CreateInvoiceDto> {
    return this.invoiceService.create(payload);
  }

  @MessagePattern('sendInvoice')
  async sendInvoice(@Payload() invoiceId: string, @Ctx() redisContex) {
    return this.invoiceService.sendInvoice(invoiceId);
  }

  @MessagePattern('getInvoice')
  async getInvoice(@Payload() invoiceId: string, @Ctx() redisContex) {
    return this.invoiceService.findOne(invoiceId);
  }

  @MessagePattern('getInvoiceByOrderId')
  async getInvoiceByOrderId(@Payload() invoiceId: string, @Ctx() redisContex) {
    return this.invoiceService.findByOrderId(invoiceId);
  }
}

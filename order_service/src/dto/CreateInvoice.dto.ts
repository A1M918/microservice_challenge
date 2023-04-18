export class CreateInvoiceDto {
  invoiceId: string;
  orderId: string;
  sentAt?: Date;
  deleted?: boolean;
}

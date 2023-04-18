import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @Prop({ required: true })
  invoiceId: string;

  @Prop({ required: true })
  orderId: string;

  @Prop()
  sentAt: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

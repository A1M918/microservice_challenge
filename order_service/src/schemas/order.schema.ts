import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  productId: string;

  @Prop()
  customerId: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop({
    required: true,
    enum: [
      'Created',
      'Accepted',
      'Rejected',
      'Shipping in progress',
      'Shipped',
    ],
  })
  status: string;

  @Prop()
  deleted?: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export class CreateOrderDto {
  readonly price: number;
  readonly quantity: number;
  readonly productId: string;
  readonly customerId: string;
  readonly status: string;
  readonly id?: string;
  readonly deleted?: boolean;
}

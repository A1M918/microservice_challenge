export interface Order {
  id?: string;
  status:
    | 'Created'
    | 'Accepted'
    | 'Rejected'
    | 'Shipping in progress'
    | 'Shipped';
  productId: string;
  customerId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deleted?: boolean;
}

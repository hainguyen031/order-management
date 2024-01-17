interface OrderDetail {
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
}

export interface ICreateOrder {
  name: string;
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderDetails: OrderDetail[];
}

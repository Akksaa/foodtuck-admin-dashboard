// types.ts
export type ShippingInfo = {
    userName: string;
    userPhone: string;
    userId: string;
    address: string;
    city: string;
    countryCode: string;
    postalCode: string;
    _id: string;
  };
  
  export type PaymentDetails = {
    totalAmount: number;
    status: 'pending' | 'completed' | 'failed';
  };
  
  export type OrderItem = {
    _key: string;
    quantity: number;
    unitPrice: number;
    product: {
      _id: string;
      name: string;
      category: string;
      price: number;
    };
  };
  
  export type Order = {
    _id: string;
    orderId: string;
    customerId: string;
    customerName: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentDetails: PaymentDetails;
    orderDate: string;
    shippingInfo: ShippingInfo;
    items: OrderItem[];
  };
  
  export type OrdersTableProps = {
    orders: Order[];
    onViewDetails?: (order: Order) => void;
    onUpdateStatus?: (orderId: string, status: Order['status']) => void;
  };
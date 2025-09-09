import { Order, OrderItem } from '../store/slices/ordersSlice';
import { mockAPIRequest, getStoredData, storeData, generateId } from './api';

const ORDERS_KEY = 'mock_orders';

const getOrders = (): Order[] => getStoredData(ORDERS_KEY, []);
const storeOrders = (orders: Order[]) => storeData(ORDERS_KEY, orders);

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15T10:30:00Z',
    status: 'delivered',
    items: [
      {
        id: '1',
        product: {
          id: '1',
          name: 'Wireless Headphones',
          price: 99.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
          category: 'Electronics',
          rating: 4.5,
          reviews: 128,
          description: 'High-quality wireless headphones',
          inStock: true,
          images: [],
        },
        quantity: 1,
        price: 99.99,
        selectedColor: 'Black',
      },
      {
        id: '2',
        product: {
          id: '2',
          name: 'Phone Case',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop',
          category: 'Accessories',
          rating: 4.2,
          reviews: 89,
          description: 'Protective phone case',
          inStock: true,
          images: [],
        },
        quantity: 2,
        price: 24.99,
        selectedColor: 'Blue',
      },
    ],
    subtotal: 149.97,
    tax: 12.00,
    shipping: 7.99,
    total: 169.96,
    estimatedDelivery: 'Delivered on Jan 18, 2024',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      zipCode: '10001',
      country: 'United States',
    },
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'Visa',
    },
    trackingNumber: 'TRK123456789',
  },
];

// Initialize mock orders if not exists
if (getOrders().length === 0) {
  storeOrders(mockOrders);
}

export const ordersAPI = {
  async getOrders(): Promise<Order[]> {
    const orders = getOrders();
    return mockAPIRequest(orders);
  },

  async getOrderById(id: string): Promise<Order> {
    const orders = getOrders();
    const order = orders.find(o => o.id === id);
    
    if (!order) {
      return mockAPIRequest(null as any, true, 'Order not found');
    }
    
    return mockAPIRequest(order);
  },

  async createOrder(orderData: {
    items: OrderItem[];
    shippingAddress: Order['shippingAddress'];
    paymentMethod: Order['paymentMethod'];
  }): Promise<Order> {
    const orders = getOrders();
    
    const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 7.99; // Free shipping over $50
    const total = subtotal + tax + shipping;
    
    const newOrder: Order = {
      id: generateId(),
      orderNumber: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString(),
      status: 'pending',
      items: orderData.items,
      subtotal,
      tax,
      shipping,
      total,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 5 days from now
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      trackingNumber: `TRK${generateId().toUpperCase()}`,
    };
    
    orders.unshift(newOrder); // Add to beginning
    storeOrders(orders);
    
    return mockAPIRequest(newOrder);
  },

  async cancelOrder(id: string): Promise<Order> {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
      return mockAPIRequest(null as any, true, 'Order not found');
    }
    
    const order = orders[orderIndex];
    
    if (order.status === 'delivered' || order.status === 'cancelled') {
      return mockAPIRequest(null as any, true, 'Cannot cancel this order');
    }
    
    order.status = 'cancelled';
    order.estimatedDelivery = 'Order cancelled';
    
    storeOrders(orders);
    
    return mockAPIRequest(order);
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
      return mockAPIRequest(null as any, true, 'Order not found');
    }
    
    orders[orderIndex].status = status;
    
    // Update estimated delivery based on status
    switch (status) {
      case 'processing':
        orders[orderIndex].estimatedDelivery = 'Processing - will ship soon';
        break;
      case 'shipped':
        orders[orderIndex].estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();
        break;
      case 'delivered':
        orders[orderIndex].estimatedDelivery = `Delivered on ${new Date().toLocaleDateString()}`;
        break;
    }
    
    storeOrders(orders);
    
    return mockAPIRequest(orders[orderIndex]);
  },

  async reorderItems(orderId: string): Promise<Order> {
    const orders = getOrders();
    const originalOrder = orders.find(o => o.id === orderId);
    
    if (!originalOrder) {
      return mockAPIRequest(null as any, true, 'Original order not found');
    }
    
    // Create new order with same items
    const newOrderData = {
      items: originalOrder.items,
      shippingAddress: originalOrder.shippingAddress,
      paymentMethod: originalOrder.paymentMethod,
    };
    
    return this.createOrder(newOrderData);
  },

  async trackOrder(orderNumber: string): Promise<{
    status: Order['status'];
    trackingEvents: Array<{
      date: string;
      status: string;
      location: string;
      description: string;
    }>;
  }> {
    const orders = getOrders();
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
      return mockAPIRequest(null as any, true, 'Order not found');
    }
    
    // Mock tracking events
    const trackingEvents = [
      {
        date: order.date,
        status: 'Order Placed',
        location: 'Online',
        description: 'Your order has been received and is being processed.',
      },
      {
        date: new Date(new Date(order.date).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'Processing',
        location: 'Warehouse',
        description: 'Your order is being prepared for shipment.',
      },
    ];
    
    if (order.status === 'shipped' || order.status === 'delivered') {
      trackingEvents.push({
        date: new Date(new Date(order.date).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Shipped',
        location: 'Fulfillment Center',
        description: `Your order has been shipped. Tracking number: ${order.trackingNumber}`,
      });
    }
    
    if (order.status === 'delivered') {
      trackingEvents.push({
        date: new Date(new Date(order.date).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Delivered',
        location: order.shippingAddress.city,
        description: 'Your order has been delivered successfully.',
      });
    }
    
    return mockAPIRequest({
      status: order.status,
      trackingEvents,
    });
  },
};
import { motion } from 'motion/react';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock, MapPin, CreditCard, Download, MessageCircle } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface OrderDetail {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  estimatedDelivery?: string;
  trackingNumber?: string;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: 'card' | 'paypal' | 'apple_pay';
    last4?: string;
    brand?: string;
  };
  timeline: {
    status: string;
    date: string;
    description: string;
    completed: boolean;
  }[];
}

const mockOrderDetail: OrderDetail = {
  id: '1',
  orderNumber: 'ORD-2024-001',
  date: '2024-01-15',
  status: 'delivered',
  total: 299.99,
  subtotal: 279.99,
  shipping: 0,
  tax: 20.00,
  estimatedDelivery: 'Delivered on Jan 18, 2024',
  trackingNumber: '1Z999AA1234567890',
  items: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      price: 199.99,
      quantity: 1,
      color: 'Black'
    },
    {
      id: '2',
      name: 'USB-C Fast Charger',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400',
      price: 39.99,
      quantity: 1
    },
    {
      id: '3',
      name: 'Phone Case',
      image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400',
      price: 39.99,
      quantity: 1,
      color: 'Clear',
      size: 'iPhone 15 Pro'
    }
  ],
  shippingAddress: {
    name: 'John Doe',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  paymentMethod: {
    type: 'card',
    last4: '4242',
    brand: 'Visa'
  },
  timeline: [
    {
      status: 'Order Placed',
      date: '2024-01-15 2:30 PM',
      description: 'Your order has been received and is being processed.',
      completed: true
    },
    {
      status: 'Payment Confirmed',
      date: '2024-01-15 2:32 PM',
      description: 'Payment has been successfully processed.',
      completed: true
    },
    {
      status: 'Processing',
      date: '2024-01-16 9:00 AM',
      description: 'Your order is being prepared for shipment.',
      completed: true
    },
    {
      status: 'Shipped',
      date: '2024-01-16 6:00 PM',
      description: 'Your order has been shipped and is on its way.',
      completed: true
    },
    {
      status: 'Out for Delivery',
      date: '2024-01-18 8:00 AM',
      description: 'Your package is out for delivery.',
      completed: true
    },
    {
      status: 'Delivered',
      date: '2024-01-18 2:15 PM',
      description: 'Your order has been successfully delivered.',
      completed: true
    }
  ]
};

const getStatusIcon = (status: OrderDetail['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5" />;
    case 'processing':
      return <Package className="h-5 w-5" />;
    case 'shipped':
      return <Truck className="h-5 w-5" />;
    case 'delivered':
      return <CheckCircle className="h-5 w-5" />;
    case 'cancelled':
      return <XCircle className="h-5 w-5" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
};

const getStatusColor = (status: OrderDetail['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

interface OrderDetailPageProps {
  orderId?: string;
  onBack: () => void;
}

export function OrderDetailPage({ orderId, onBack }: OrderDetailPageProps) {
  const order = mockOrderDetail; // In real app, fetch by orderId

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
      >
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon" onClick={onBack} className="flex-shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl md:text-2xl font-bold truncate">Order Details</h1>
            <p className="text-sm text-muted-foreground truncate">{order.orderNumber}</p>
          </div>
        </div>
        <div className="flex-shrink-0 sm:ml-4">
          <Badge className={`${getStatusColor(order.status)} border-0`}>
            <span className="flex items-center space-x-1">
              {getStatusIcon(order.status)}
              <span className="capitalize">{order.status}</span>
            </span>
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-4 md:space-y-6">
          {/* Order Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-4 md:p-6">
              <h3 className="font-semibold mb-4 md:mb-6 flex items-center">
                <Package className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Order Timeline</span>
              </h3>
              <div className="space-y-3 md:space-y-4">
                {order.timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4">
                    <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                      item.completed 
                        ? 'bg-green-100 dark:bg-green-900/20' 
                        : 'bg-muted'
                    }`}>
                      {item.completed ? (
                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                        <p className={`font-medium text-sm md:text-base ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {item.status}
                        </p>
                        <span className="text-xs md:text-sm text-muted-foreground flex-shrink-0">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-4 md:p-6">
              <h3 className="font-semibold mb-4 md:mb-6">Order Items ({order.items.length})</h3>
              <div className="space-y-3 md:space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-muted/20 rounded-lg">
                    <Avatar className="h-12 w-12 md:h-16 md:w-16 rounded-lg flex-shrink-0">
                      <AvatarImage src={item.image} alt={item.name} className="object-cover" />
                      <AvatarFallback className="rounded-lg text-xs">{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm md:text-base truncate">{item.name}</h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-muted-foreground mt-1">
                        <span>Qty: {item.quantity}</span>
                        {item.color && <span>• Color: {item.color}</span>}
                        {item.size && <span className="hidden sm:inline">• Size: {item.size}</span>}
                        {item.size && <span className="sm:hidden">• {item.size}</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-medium text-sm md:text-base">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-4 md:p-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-6 space-y-2">
                <Button className="w-full" variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Download Invoice</span>
                  <span className="sm:hidden">Invoice</span>
                </Button>
                {order.trackingNumber && (
                  <Button className="w-full" variant="outline" size="sm">
                    <Truck className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Track Package</span>
                    <span className="sm:hidden">Track</span>
                  </Button>
                )}
                {order.status === 'delivered' && (
                  <Button className="w-full" size="sm">
                    <span className="hidden sm:inline">Reorder Items</span>
                    <span className="sm:hidden">Reorder</span>
                  </Button>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="p-4 md:p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <MapPin className="h-4 md:h-5 w-4 md:w-5 mr-2 flex-shrink-0" />
                <span>Shipping Address</span>
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-muted-foreground">{order.shippingAddress.address}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-muted-foreground">{order.shippingAddress.country}</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="p-4 md:p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <CreditCard className="h-4 md:h-5 w-4 md:w-5 mr-2 flex-shrink-0" />
                <span>Payment Method</span>
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-muted rounded flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm capitalize">
                    {order.paymentMethod.brand} ending in {order.paymentMethod.last4}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {order.paymentMethod.type === 'card' ? 'Credit Card' : order.paymentMethod.type}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard className="p-4 md:p-6 text-center">
              <MessageCircle className="h-6 w-6 md:h-8 md:w-8 mx-auto text-muted-foreground mb-3" />
              <h4 className="font-medium mb-2 text-sm md:text-base">Need Help?</h4>
              <p className="text-xs md:text-sm text-muted-foreground mb-4">
                Contact our support team for any questions about your order.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <span className="hidden sm:inline">Contact Support</span>
                <span className="sm:hidden">Support</span>
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
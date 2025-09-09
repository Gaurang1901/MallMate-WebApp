import { motion } from 'motion/react';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  estimatedDelivery?: string;
}

interface OrdersPageProps {
  onViewOrderDetail?: (orderId: string) => void;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 299.99,
    items: 3,
    estimatedDelivery: 'Delivered on Jan 18, 2024'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 149.99,
    items: 1,
    estimatedDelivery: 'Expected Jan 25, 2024'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'processing',
    total: 89.99,
    items: 2,
    estimatedDelivery: 'Expected Jan 28, 2024'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-01-10',
    status: 'cancelled',
    total: 199.99,
    items: 1,
    estimatedDelivery: 'Order cancelled'
  }
];

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'processing':
      return <Package className="h-4 w-4" />;
    case 'shipped':
      return <Package className="h-4 w-4" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: Order['status']) => {
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

export function OrdersPage({ onViewOrderDetail }: OrdersPageProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <Package className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track and manage all your orders in one place. View order details, delivery status, and order history.
        </p>
      </motion.div>

      <div className="grid gap-4">
        {mockOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold">{order.orderNumber}</h3>
                    <Badge className={`${getStatusColor(order.status)} border-0`}>
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Order Date:</span> {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Items:</span> {order.items}
                    </div>
                    <div>
                      <span className="font-medium">Total:</span> ${order.total.toFixed(2)}
                    </div>
                  </div>
                  
                  {order.estimatedDelivery && (
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Delivery:</span> {order.estimatedDelivery}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewOrderDetail?.(order.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {order.status === 'delivered' && (
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  )}
                  {order.status === 'pending' && (
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {mockOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <GlassCard className="p-8 max-w-md mx-auto">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Button>Start Shopping</Button>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
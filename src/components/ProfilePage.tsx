import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Package, Clock, CheckCircle, XCircle, Eye, Settings, CreditCard, Bell, Shield } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  joinDate: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  estimatedDelivery?: string;
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

export function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    zipCode: '10001',
    country: 'United States',
    joinDate: '2024-01-01'
  });

  const [editForm, setEditForm] = useState<UserProfile>(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(profile);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Filter orders by status
  const activeOrders = mockOrders.filter(order => 
    order.status === 'pending' || order.status === 'processing' || order.status === 'shipped'
  );
  
  const pastOrders = mockOrders.filter(order => 
    order.status === 'delivered' || order.status === 'cancelled'
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <User className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage your personal information, orders, and account settings.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6">
          <Tabs defaultValue="edit-profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4">
              <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit-profile" className="space-y-6 mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Picture & Basic Info */}
                <div>
                  <GlassCard className="p-6 text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={user?.avatar} alt={profile.name} />
                      <AvatarFallback className="text-lg">
                        {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.email}</p>
                    <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Member since {new Date(profile.joinDate).toLocaleDateString()}
                    </div>
                    <Button variant="outline" className="mt-4 w-full">
                      Change Avatar
                    </Button>
                  </GlassCard>
                </div>

                {/* Personal Information */}
                <div className="lg:col-span-2">
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      {!isEditing ? (
                        <Button variant="outline" size="sm" onClick={handleEdit}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={handleSave}>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Full Name
                        </Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                          />
                        ) : (
                          <p className="py-2 px-3 bg-muted/50 rounded-md">{profile.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Address
                        </Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                        ) : (
                          <p className="py-2 px-3 bg-muted/50 rounded-md">{profile.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          Phone Number
                        </Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        ) : (
                          <p className="py-2 px-3 bg-muted/50 rounded-md">{profile.phone}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country" className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Country
                        </Label>
                        {isEditing ? (
                          <Input
                            id="country"
                            value={editForm.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                          />
                        ) : (
                          <p className="py-2 px-3 bg-muted/50 rounded-md">{profile.country}</p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Street Address
                        </Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            value={editForm.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                          />
                        ) : (
                          <p className="py-2 px-3 bg-muted/50 rounded-md">{profile.address}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        {isEditing ? (
                          <Input
                            id="city"
                            value={editForm.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                          />
                        ) : (
                          <p className="py-2 px-3 bg-muted/50 rounded-md">{profile.city}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        {isEditing ? (
                          <Input
                            id="zipCode"
                            value={editForm.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          />
                        ) : (
                          <p className="py-2 px-3 bg-muted/50 rounded-md">{profile.zipCode}</p>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6 mt-6">
              <div className="space-y-6">
                {/* Active Orders */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Active Orders ({activeOrders.length})</h3>
                  <div className="grid gap-4">
                    {activeOrders.map((order, index) => (
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
                                <h4 className="font-semibold">{order.orderNumber}</h4>
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
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
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
                    {activeOrders.length === 0 && (
                      <GlassCard className="p-8 text-center">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No active orders</p>
                      </GlassCard>
                    )}
                  </div>
                </div>

                {/* Past Orders */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Past Orders ({pastOrders.length})</h3>
                  <div className="grid gap-4">
                    {pastOrders.map((order, index) => (
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
                                <h4 className="font-semibold">{order.orderNumber}</h4>
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
                                  <span className="font-medium text-foreground">Status:</span> {order.estimatedDelivery}
                                </div>
                              )}
                            </div>

                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              {order.status === 'delivered' && (
                                <Button variant="outline" size="sm">
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                    {pastOrders.length === 0 && (
                      <GlassCard className="p-8 text-center">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No past orders</p>
                      </GlassCard>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold mb-6">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive order updates via email</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Payment Methods</p>
                          <p className="text-sm text-muted-foreground">Manage your saved payment methods</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Shipping Addresses</p>
                          <p className="text-sm text-muted-foreground">Manage your delivery addresses</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Privacy Settings</p>
                          <p className="text-sm text-muted-foreground">Control your data and privacy</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Account Preferences</p>
                          <p className="text-sm text-muted-foreground">Language, currency, and more</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center space-x-3">
                        <X className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium text-red-900 dark:text-red-100">Delete Account</p>
                          <p className="text-sm text-red-600 dark:text-red-400">Permanently remove your account</p>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold mb-6">Security & Privacy</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Shield className="h-5 w-5 text-green-600" />
                          <p className="font-medium">Password</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Last changed 3 months ago</p>
                        <Button variant="outline" size="sm">Change Password</Button>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Shield className="h-5 w-5 text-orange-600" />
                          <p className="font-medium">Two-Factor Authentication</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Not enabled</p>
                        <Button variant="outline" size="sm">Enable 2FA</Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Settings className="h-5 w-5 text-blue-600" />
                          <p className="font-medium">Login Sessions</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Manage your active sessions</p>
                        <Button variant="outline" size="sm">View Sessions</Button>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Eye className="h-5 w-5 text-purple-600" />
                          <p className="font-medium">Data Export</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Download your account data</p>
                        <Button variant="outline" size="sm">Request Export</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Recent Security Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">Login from New Device</p>
                          <p className="text-sm text-muted-foreground">Chrome on Windows • Today at 2:45 PM</p>
                        </div>
                        <Badge variant="secondary">Successful</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">Password Changed</p>
                          <p className="text-sm text-muted-foreground">3 months ago</p>
                        </div>
                        <Badge variant="secondary">Successful</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">Account Created</p>
                          <p className="text-sm text-muted-foreground">{new Date(profile.joinDate).toLocaleDateString()}</p>
                        </div>
                        <Badge variant="secondary">Success</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </motion.div>
    </div>
  );
}
import { motion } from 'motion/react';
import { Users, Heart, Shield, Truck, Award, Globe } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Badge } from './ui/badge';

export function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your privacy and security are our top priorities with end-to-end encryption.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Lightning-fast delivery with real-time tracking across the globe.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: '24/7 customer support and hassle-free returns within 30 days.'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Premium products from trusted brands with quality guarantees.'
    },
    {
      icon: Globe,
      title: 'Worldwide Reach',
      description: 'Serving customers in over 100 countries with local support.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by shoppers, for shoppers with community feedback at heart.'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Happy Customers' },
    { value: '10,000+', label: 'Products' },
    { value: '100+', label: 'Countries' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
          About MallMate
        </Badge>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Redefining Online Shopping
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          MallMate is more than just an e-commerce platform. We're your trusted shopping companion, 
          bringing you the world's best products with unmatched convenience and service excellence.
        </p>
      </motion.section>

      {/* Story Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2020, MallMate began with a simple vision: to create the most 
                  intuitive and delightful shopping experience possible. What started as a 
                  small team's passion project has grown into a global platform serving 
                  thousands of customers worldwide.
                </p>
                <p>
                  We believe that shopping should be more than just a transaction. It should 
                  be an experience that brings joy, saves time, and connects people with 
                  products they love. Every feature we build, every partnership we form, 
                  is guided by this core belief.
                </p>
                <p>
                  Today, we're proud to offer over 10,000 carefully curated products from 
                  trusted brands, with a focus on quality, sustainability, and customer 
                  satisfaction that goes above and beyond expectations.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <GlassCard className="p-6 text-center hover:shadow-lg transition-all duration-300">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Choose MallMate?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing exceptional value through innovative features 
            and unwavering dedication to customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <GlassCard className="p-6 h-full hover:shadow-xl transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <GlassCard className="p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To democratize access to quality products while building a sustainable, 
              customer-centric marketplace that empowers both shoppers and sellers to thrive. 
              We're not just selling products; we're building relationships and creating 
              value that extends far beyond the transaction.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {['Innovation', 'Quality', 'Trust', 'Sustainability', 'Community'].map((value) => (
                <Badge key={value} variant="secondary" className="px-4 py-2">
                  {value}
                </Badge>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.section>
    </div>
  );
}
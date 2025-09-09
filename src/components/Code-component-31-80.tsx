import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, HelpCircle, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'orders' | 'shipping' | 'payments' | 'returns' | 'account';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I place an order?',
    answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. You\'ll need to create an account and provide shipping and payment information.',
    category: 'orders'
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely.',
    category: 'payments'
  },
  {
    id: '3',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping may take 7-14 business days.',
    category: 'shipping'
  },
  {
    id: '4',
    question: 'Can I track my order?',
    answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track your order status in the "My Orders" section of your account.',
    category: 'orders'
  },
  {
    id: '5',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some items like personalized products are not returnable.',
    category: 'returns'
  },
  {
    id: '6',
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the sign-in page, enter your email address, and follow the instructions in the reset email we send you.',
    category: 'account'
  },
  {
    id: '7',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. Check our shipping page for more details.',
    category: 'shipping'
  },
  {
    id: '8',
    question: 'How can I cancel my order?',
    answer: 'You can cancel your order within 1 hour of placing it by going to "My Orders" and clicking "Cancel". After that, please contact customer service.',
    category: 'orders'
  },
  {
    id: '9',
    question: 'Are there any shipping fees?',
    answer: 'We offer free standard shipping on orders over $50. Express shipping and orders under $50 have shipping fees that are calculated at checkout.',
    category: 'shipping'
  },
  {
    id: '10',
    question: 'How do I contact customer service?',
    answer: 'You can contact us via email at support@mallmate.com, phone at 1-800-MALLMATE, or through our live chat feature available 24/7.',
    category: 'general'
  },
  {
    id: '11',
    question: 'Can I modify my order after placing it?',
    answer: 'Order modifications are only possible within 1 hour of placing your order and before it enters processing. Contact customer service immediately for assistance.',
    category: 'orders'
  },
  {
    id: '12',
    question: 'What if I receive a damaged item?',
    answer: 'If you receive a damaged item, please contact us within 48 hours with photos of the damage. We\'ll arrange for a replacement or refund immediately.',
    category: 'returns'
  }
];

const categories = [
  { id: 'all', name: 'All Questions', icon: HelpCircle },
  { id: 'general', name: 'General', icon: HelpCircle },
  { id: 'orders', name: 'Orders', icon: MessageCircle },
  { id: 'shipping', name: 'Shipping', icon: Phone },
  { id: 'payments', name: 'Payments', icon: Mail },
  { id: 'returns', name: 'Returns', icon: HelpCircle },
  { id: 'account', name: 'Account', icon: HelpCircle }
];

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <HelpCircle className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to the most common questions about MallMate. Can't find what you're looking for? Contact our support team.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <GlassCard className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-transparent border-white/20"
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* FAQ Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard className="overflow-hidden">
                <Collapsible
                  open={openItems.includes(faq.id)}
                  onOpenChange={() => toggleItem(faq.id)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-6 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start space-x-4 text-left">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mt-1">
                          <HelpCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">
                            {faq.question}
                          </h3>
                          <div className="mt-1">
                            <span className="inline-block px-2 py-1 text-xs bg-muted/50 rounded-full capitalize">
                              {faq.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`h-5 w-5 text-muted-foreground transition-transform ${
                          openItems.includes(faq.id) ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-6 pb-6">
                      <div className="ml-12 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </GlassCard>
            </motion.div>
          ))
        ) : (
          <GlassCard className="p-8 text-center">
            <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse a different category.
            </p>
          </GlassCard>
        )}
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="p-6 text-center">
          <h3 className="font-semibold mb-4">Still need help?</h3>
          <p className="text-muted-foreground mb-6">
            Our customer support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Live Chat</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email Support</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Us</span>
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
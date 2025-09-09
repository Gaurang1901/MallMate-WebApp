import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

interface FooterProps {
  onPageClick: (page: string) => void;
}

export function Footer({ onPageClick }: FooterProps) {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className="mt-20">
      <GlassCard className="rounded-none rounded-t-3xl">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MallMate
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your ultimate shopping destination for premium products across all categories. 
                Quality, convenience, and customer satisfaction guaranteed.
              </p>
              <div className="flex space-x-3">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'About Us', page: 'about' },
                  { label: 'Contact Us', page: 'contact' },
                  { label: 'FAQ', page: 'faq' },
                  { label: 'Shipping Info', page: 'shipping' },
                  { label: 'Returns', page: 'returns' },
                  { label: 'Size Guide', page: 'size-guide' }
                ].map((link) => (
                  <li key={link.page}>
                    <button
                      onClick={() => onPageClick(link.page)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'Privacy Policy', page: 'privacy' },
                  { label: 'Terms of Service', page: 'terms' },
                  { label: 'Cookie Policy', page: 'cookies' },
                  { label: 'Refund Policy', page: 'refund' },
                  { label: 'Warranty', page: 'warranty' },
                  { label: 'Compliance', page: 'compliance' }
                ].map((link) => (
                  <li key={link.page}>
                    <button
                      onClick={() => onPageClick(link.page)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="font-semibold">Stay Connected</h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="text-sm"
                  required
                />
                <Button type="submit" className="w-full" size="sm">
                  Subscribe to Newsletter
                </Button>
              </form>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@mallmate.com</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>New York, NY 10001</span>
                </div>
              </div>
            </motion.div>
          </div>

          <Separator className="my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 MallMate. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => onPageClick('accessibility')}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Accessibility
              </button>
              <button
                onClick={() => onPageClick('careers')}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Careers
              </button>
              <button
                onClick={() => onPageClick('press')}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Press
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </footer>
  );
}
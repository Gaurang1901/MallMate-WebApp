import React from 'react'
import CategoriesMenu from './components/CategoriesMenu'
import { motion } from 'framer-motion'
import { Search, MapPin, Clock, Store, Users, Star } from 'lucide-react'
import { useTheme } from '@mui/material/styles'

const HomePage: React.FC = () => {
  const theme = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-primary/20 via-primary/10 to-background">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
          >
            Welcome to MallMate
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
          >
            Your one-stop destination for shopping, dining, and entertainment
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for stores, restaurants, or events..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center text-foreground">Browse Categories</h2>
          <CategoriesMenu />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm border border-border"
            >
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Easy Navigation</h3>
              <p className="text-muted-foreground">Find your way around the mall with our interactive map and store locator</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm border border-border"
            >
              <Clock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Real-time Updates</h3>
              <p className="text-muted-foreground">Stay informed about store hours, events, and special offers</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm border border-border"
            >
              <Search className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Smart Search</h3>
              <p className="text-muted-foreground">Quickly find what you're looking for with our advanced search feature</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center p-6 rounded-lg bg-card border border-border"
            >
              <Store className="w-8 h-8 text-primary mb-2" />
              <h4 className="text-2xl font-bold text-foreground">200+</h4>
              <p className="text-sm text-muted-foreground">Stores</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center p-6 rounded-lg bg-card border border-border"
            >
              <Users className="w-8 h-8 text-primary mb-2" />
              <h4 className="text-2xl font-bold text-foreground">50k+</h4>
              <p className="text-sm text-muted-foreground">Visitors</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center p-6 rounded-lg bg-card border border-border"
            >
              <Star className="w-8 h-8 text-primary mb-2" />
              <h4 className="text-2xl font-bold text-foreground">4.8</h4>
              <p className="text-sm text-muted-foreground">Rating</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center p-6 rounded-lg bg-card border border-border"
            >
              <Clock className="w-8 h-8 text-primary mb-2" />
              <h4 className="text-2xl font-bold text-foreground">24/7</h4>
              <p className="text-sm text-muted-foreground">Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center text-foreground">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden shadow-sm border border-border bg-card"
            >
              <div className="aspect-video bg-muted" />
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-foreground">Summer Fashion Show</h3>
                <p className="text-sm text-muted-foreground mb-4">Join us for the latest fashion trends and exclusive collections</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>June 15, 2024 • 2:00 PM</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

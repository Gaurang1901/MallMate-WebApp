import { Package, Users, Truck, Star, Grid3X3, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { KPICard as KPICardType } from '../types/navigation';
import { GlassCard } from './ui/glass-card';

interface KPICardsProps {
  cards: KPICardType[];
}

const iconMap = {
  package: Package,
  users: Users,
  truck: Truck,
  star: Star,
  grid: Grid3X3,
};

export function KPICards({ cards }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => {
        const IconComponent = iconMap[card.icon as keyof typeof iconMap] || Package;
        
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <GlassCard className="p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>
                {card.trend && (
                  <div className={`flex items-center text-sm ${
                    card.trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.trend.isPositive ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {card.trend.value}%
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {card.value}
                </h3>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {card.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
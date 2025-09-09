import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface BreadcrumbItem {
  label: string;
  action: () => void;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length <= 1) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-1 text-sm mb-6"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index === 0 && (
            <Home className="h-4 w-4 mr-2 text-muted-foreground" />
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={item.action}
            className={`p-0 h-auto font-normal ${
              item.isActive 
                ? 'text-foreground cursor-default' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            disabled={item.isActive}
          >
            {item.label}
          </Button>
          
          {index < items.length - 1 && (
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          )}
        </div>
      ))}
    </motion.nav>
  );
}
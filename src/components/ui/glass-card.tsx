import { cn } from "./utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'strong';
}

export function GlassCard({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: GlassCardProps) {
  const variants = {
    default: 'backdrop-blur-lg bg-white/20 dark:bg-black/20 border border-white/20 dark:border-white/10',
    subtle: 'backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5',
    strong: 'backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/30 dark:border-white/20'
  };

  return (
    <div
      className={cn(
        'rounded-lg shadow-lg transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
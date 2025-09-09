import React, { useState, type ComponentType } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  Package,
  Heart,
  Grid2X2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { GlassCard } from "./ui/glass-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

interface NavigationProps {
  onSearch: (query: string) => void;
  onCartClick: () => void;
  onAuthClick: () => void;
  onNavigate: (page: string) => void;
  onBack?: () => void;
  onForward?: () => void;
  onRefresh?: () => void;
  searchQuery: string;
  currentPage?: string;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

export function Navigation({
  onSearch,
  onCartClick,
  onAuthClick,
  onNavigate,
  onBack,
  onForward,
  onRefresh,
  searchQuery,
  currentPage,
  canGoBack,
  canGoForward,
}: NavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const handleSearchSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  const NavIconButton = ({
    label,
    icon: Icon,
    page,
  }: {
    label: string;
    icon: ComponentType<{ className?: string }>;
    page: string;
  }) => (
    <Button
      variant="ghost"
      className={`gap-2 ${currentPage === page ? "bg-accent/50" : ""}`}
      onClick={() => onNavigate(page)}
    >
      <Icon className="h-4 w-4" />
      <span className="">{label}</span>
    </Button>
  );

  return (
    <GlassCard className="sticky top-0 z-50 px-4 py-3">
      <nav className="flex items-center justify-between">
        {/* Left: Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              M
            </span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MallMate
          </span>
        </motion.div>

        {/* Center: either Search or Navigation icons (desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4 justify-center">
          {isSearchOpen ? (
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full"
            >
              <Input
                name="search"
                placeholder="Search products..."
                defaultValue={searchQuery}
                autoFocus
                className="pl-10 bg-white/50 dark:bg-black/50 border-white/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <NavIconButton
                label="Home"
                icon={Home}
                page="home"
              />
              <NavIconButton
                label="Orders"
                icon={Package}
                page="orders"
              />
              <NavIconButton
                label="Wishlist"
                icon={Heart}
                page="wishlist"
              />
              <NavIconButton
                label="Categories"
                icon={Grid2X2}
                page="categories"
              />
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label={
              isSearchOpen ? "Close search" : "Open search"
            }
          >
            {isSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 px-1 min-w-[20px] h-5 text-xs">
                {itemCount}
              </Badge>
            )}
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full hover:bg-accent"
                  aria-label="Account menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 z-50"
                align="end"
              >
                <DropdownMenuItem className="font-normal cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    onNavigate("profile");
                  }}
                >
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    logout();
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={onAuthClick}
              aria-label="Sign in"
            >
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Mobile Menu Button & Essentials */}
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label={
              isSearchOpen ? "Close search" : "Open search"
            }
          >
            {isSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 px-1 min-w-[20px] h-5 text-xs">
                {itemCount}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 border-t border-white/20 pt-4"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="relative"
            >
              <Input
                name="search"
                placeholder="Search products..."
                defaultValue={searchQuery}
                className="pl-10 bg-white/50 dark:bg-black/50 border-white/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 border-t border-white/20 pt-4"
          >
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="justify-start"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    onNavigate("home");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Home className="h-4 w-4 mr-2" /> Home
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onNavigate("orders");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Package className="h-4 w-4 mr-2" /> Orders
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onNavigate("wishlist");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Heart className="h-4 w-4 mr-2" /> Wishlist
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onNavigate("categories");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Grid2X2 className="h-4 w-4 mr-2" />{" "}
                  Categories
                </Button>
              </div>

              {isAuthenticated && user ? (
                <>
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.avatar}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onNavigate("profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="justify-start"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  onClick={onAuthClick}
                  className="justify-start"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
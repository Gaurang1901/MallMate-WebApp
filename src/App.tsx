import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Navigation } from "./components/Navigation";
import { Breadcrumb } from "./components/Breadcrumb";
import { HomePage } from "./components/HomePage";
import { ProductGrid } from "./components/ProductGrid";
import { ProductDetail } from "./components/ProductDetail";
import { CategoriesPage } from "./components/CategoriesPage";
import { OrdersPage } from "./components/OrdersPage";
import { OrderDetailPage } from "./components/OrderDetailPage";
import { WishlistPage } from "./components/WishlistPage";
import { ProfilePage } from "./components/ProfilePage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { FAQPage } from "./components/FAQPage";
import { Cart } from "./components/Cart";
import { AuthModal } from "./components/AuthModal";
import { Footer } from "./components/Footer";
import { mockProducts } from "./data/mockProducts";
import { Product } from "./types";
import { PageType } from "./types/navigation";
import { categories } from "./data/mockCategories";

interface NavigationHistoryItem {
  page: PageType;
  category?: string;
  productId?: string;
  orderId?: string;
  searchQuery?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<PageType>("home");
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("");
  const [selectedOrderId, setSelectedOrderId] =
    useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Navigation history management
  const [navigationHistory, setNavigationHistory] = useState<
    NavigationHistoryItem[]
  >([{ page: "home" }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Add new navigation entry to history
  const addToHistory = useCallback(
    (item: NavigationHistoryItem) => {
      const newHistory = navigationHistory.slice(
        0,
        historyIndex + 1,
      );
      newHistory.push(item);
      setNavigationHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [navigationHistory, historyIndex],
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
    addToHistory({
      page: "product-detail",
      productId: product.id,
      category: selectedCategory,
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage("category");
    addToHistory({
      page: "category",
      category: categoryId,
    });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    setSelectedProduct(null);
    setSelectedCategory("");
    setSelectedOrderId("");
    addToHistory({ page: page as PageType });
  };

  const handleViewOrderDetail = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentPage("order-detail");
    addToHistory({
      page: "order-detail",
      orderId: orderId,
    });
  };

  const handleBackToOrders = () => {
    setCurrentPage("orders");
    setSelectedOrderId("");
    addToHistory({ page: "orders" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentPage("products");
      addToHistory({
        page: "products",
        searchQuery: query,
      });
    }
  };

  const handleBackToProducts = () => {
    const targetPage = selectedCategory
      ? "category"
      : "products";
    setCurrentPage(targetPage);
    setSelectedProduct(null);
    addToHistory({
      page: targetPage,
      category: selectedCategory,
    });
  };

  // Navigation controls
  const handleBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const historyItem = navigationHistory[newIndex];

      setHistoryIndex(newIndex);
      setCurrentPage(historyItem.page);
      setSelectedCategory(historyItem.category || "");
      setSearchQuery(historyItem.searchQuery || "");

      if (historyItem.productId) {
        const product = mockProducts.find(
          (p) => p.id === historyItem.productId,
        );
        setSelectedProduct(product || null);
      } else {
        setSelectedProduct(null);
      }

      if (historyItem.orderId) {
        setSelectedOrderId(historyItem.orderId);
      } else {
        setSelectedOrderId("");
      }
    }
  }, [historyIndex, navigationHistory]);

  const handleForward = useCallback(() => {
    if (historyIndex < navigationHistory.length - 1) {
      const newIndex = historyIndex + 1;
      const historyItem = navigationHistory[newIndex];

      setHistoryIndex(newIndex);
      setCurrentPage(historyItem.page);
      setSelectedCategory(historyItem.category || "");
      setSearchQuery(historyItem.searchQuery || "");

      if (historyItem.productId) {
        const product = mockProducts.find(
          (p) => p.id === historyItem.productId,
        );
        setSelectedProduct(product || null);
      } else {
        setSelectedProduct(null);
      }

      if (historyItem.orderId) {
        setSelectedOrderId(historyItem.orderId);
      } else {
        setSelectedOrderId("");
      }
    }
  }, [historyIndex, navigationHistory]);

  const handleRefresh = useCallback(() => {
    // Force re-render by updating a state
    setCurrentPage((prev) => prev);
  }, []);

  const canGoBack = historyIndex > 0;
  const canGoForward =
    historyIndex < navigationHistory.length - 1;

  // Filter products by category if on category page
  const getFilteredProducts = () => {
    if (currentPage === "category" && selectedCategory) {
      return mockProducts.filter(
        (product) =>
          product.category.toLowerCase() ===
          selectedCategory.toLowerCase(),
      );
    }
    return mockProducts;
  };

  // Generate breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [
      {
        label: "Home",
        action: () => handleNavigate("home"),
        isActive: currentPage === "home",
      },
    ];

    if (currentPage === "categories") {
      items.push({
        label: "Categories",
        action: () => handleNavigate("categories"),
        isActive: true,
      });
    } else if (currentPage === "category" && selectedCategory) {
      const category = categories.find(
        (c) => c.id === selectedCategory,
      );
      items.push(
        {
          label: "Categories",
          action: () => handleNavigate("categories"),
          isActive: false,
        },
        {
          label: category?.name || selectedCategory,
          action: () => handleCategoryClick(selectedCategory),
          isActive: true,
        },
      );
    } else if (
      currentPage === "product-detail" &&
      selectedProduct
    ) {
      if (selectedCategory) {
        const category = categories.find(
          (c) => c.id === selectedCategory,
        );
        items.push(
          {
            label: "Categories",
            action: () => handleNavigate("categories"),
            isActive: false,
          },
          {
            label: category?.name || selectedCategory,
            action: () => handleCategoryClick(selectedCategory),
            isActive: false,
          },
        );
      } else {
        items.push({
          label: "Products",
          action: () => handleNavigate("products"),
          isActive: false,
        });
      }
      items.push({
        label: selectedProduct.name,
        action: () => {},
        isActive: true,
      });
    } else if (currentPage === "products") {
      items.push({
        label: searchQuery
          ? `Search: "${searchQuery}"`
          : "Products",
        action: () => handleNavigate("products"),
        isActive: true,
      });
    } else if (currentPage === "about") {
      items.push({
        label: "About",
        action: () => handleNavigate("about"),
        isActive: true,
      });
    } else if (currentPage === "orders") {
      items.push({
        label: "Orders",
        action: () => handleNavigate("orders"),
        isActive: true,
      });
    } else if (currentPage === "order-detail") {
      items.push(
        {
          label: "Orders",
          action: () => handleNavigate("orders"),
          isActive: false,
        },
        {
          label: "Order Details",
          action: () => {},
          isActive: true,
        },
      );
    } else if (currentPage === "wishlist") {
      items.push({
        label: "Wishlist",
        action: () => handleNavigate("wishlist"),
        isActive: true,
      });
    } else if (currentPage === "profile") {
      items.push({
        label: "Profile",
        action: () => handleNavigate("profile"),
        isActive: true,
      });
    } else if (currentPage === "contact") {
      items.push({
        label: "Contact",
        action: () => handleNavigate("contact"),
        isActive: true,
      });
    } else if (currentPage === "faq") {
      items.push({
        label: "FAQ",
        action: () => handleNavigate("faq"),
        isActive: true,
      });
    }

    return items;
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            products={mockProducts}
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
            onNavigate={handleNavigate}
          />
        );

      case "products":
      case "category":
        return (
          <ProductGrid
            products={getFilteredProducts()}
            onProductClick={handleProductClick}
            searchQuery={searchQuery}
          />
        );

      case "product-detail":
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToProducts}
          />
        ) : (
          <HomePage
            products={mockProducts}
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
            onNavigate={handleNavigate}
          />
        );

      case "categories":
        return (
          <CategoriesPage
            onCategoryClick={handleCategoryClick}
          />
        );

      case "orders":
        return <OrdersPage onViewOrderDetail={handleViewOrderDetail} />;

      case "order-detail":
        return <OrderDetailPage orderId={selectedOrderId} onBack={handleBackToOrders} />;

      case "wishlist":
        return (
          <WishlistPage onProductClick={handleProductClick} />
        );

      case "profile":
        return <ProfilePage />;

      case "about":
        return <AboutPage />;

      case "contact":
        return <ContactPage />;

      case "faq":
        return <FAQPage />;

      default:
        return (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">
              Page Coming Soon
            </h1>
            <p className="text-muted-foreground">
              This page is under construction. Please check back
              later!
            </p>
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:50px_50px]" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
              <Navigation
                onSearch={handleSearch}
                onCartClick={() => setIsCartOpen(true)}
                onAuthClick={() => setIsAuthModalOpen(true)}
                onNavigate={handleNavigate}
                onBack={handleBack}
                onForward={handleForward}
                onRefresh={handleRefresh}
                searchQuery={searchQuery}
                currentPage={currentPage}
                canGoBack={canGoBack}
                canGoForward={canGoForward}
              />

              <main className="flex-1 container mx-auto px-4 py-8">
                {/* Breadcrumb Navigation */}
                <Breadcrumb items={getBreadcrumbItems()} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      currentPage +
                      selectedCategory +
                      (selectedProduct?.id || "")
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderCurrentPage()}
                  </motion.div>
                </AnimatePresence>
              </main>

              <Footer onPageClick={handleNavigate} />
            </div>

            {/* Cart Sidebar */}
            <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />

            {/* Auth Modal */}
            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
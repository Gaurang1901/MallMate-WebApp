import { Product } from '../types';
import { CartItem } from '../store/slices/cartSlice';
import { mockAPIRequest, getStoredData, storeData, generateId } from './api';

const CART_KEY = 'mock_cart';

const getCart = (): CartItem[] => getStoredData(CART_KEY, []);
const storeCart = (cart: CartItem[]) => storeData(CART_KEY, cart);

export const cartAPI = {
  async getCart(): Promise<CartItem[]> {
    const cart = getCart();
    return mockAPIRequest(cart);
  },

  async addToCart(item: {
    product: Product;
    quantity: number;
    size?: string;
    color?: string;
  }): Promise<CartItem> {
    const cart = getCart();
    
    const cartItem: CartItem = {
      id: generateId(),
      product: item.product,
      quantity: item.quantity,
      selectedSize: item.size,
      selectedColor: item.color,
    };
    
    // Check if item already exists with same product and options
    const existingItemIndex = cart.findIndex(
      existing => existing.product.id === item.product.id &&
                 existing.selectedSize === item.size &&
                 existing.selectedColor === item.color
    );
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += item.quantity;
      storeCart(cart);
      return mockAPIRequest(cart[existingItemIndex]);
    } else {
      cart.push(cartItem);
      storeCart(cart);
      return mockAPIRequest(cartItem);
    }
  },

  async updateCartItem(id: string, quantity: number): Promise<CartItem> {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return mockAPIRequest(null as any, true, 'Cart item not found');
    }
    
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    
    storeCart(cart);
    return mockAPIRequest(cart[itemIndex]);
  },

  async removeFromCart(id: string): Promise<void> {
    const cart = getCart();
    const filteredCart = cart.filter(item => item.id !== id);
    storeCart(filteredCart);
    return mockAPIRequest(undefined);
  },

  async clearCart(): Promise<void> {
    storeCart([]);
    return mockAPIRequest(undefined);
  },

  async moveToWishlist(id: string): Promise<void> {
    // Implementation would move item from cart to wishlist
    const cart = getCart();
    const item = cart.find(item => item.id === id);
    
    if (!item) {
      return mockAPIRequest(null as any, true, 'Cart item not found');
    }
    
    // Remove from cart
    const filteredCart = cart.filter(item => item.id !== id);
    storeCart(filteredCart);
    
    // Add to wishlist (implementation depends on wishlist structure)
    return mockAPIRequest(undefined);
  },

  async applyCoupon(code: string): Promise<{ discount: number; message: string }> {
    const validCoupons = {
      'SAVE10': { discount: 0.1, message: '10% discount applied' },
      'SAVE20': { discount: 0.2, message: '20% discount applied' },
      'WELCOME': { discount: 0.15, message: 'Welcome discount applied' },
    };
    
    const coupon = validCoupons[code as keyof typeof validCoupons];
    
    if (!coupon) {
      return mockAPIRequest(null as any, true, 'Invalid coupon code');
    }
    
    return mockAPIRequest(coupon);
  },
};
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product, CartState } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
        
        return {
          items: updatedItems,
          total,
          itemCount,
        };
      } else {
        const updatedItems = [...state.items, { product: action.product, quantity: 1 }];
        const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
        
        return {
          items: updatedItems,
          total,
          itemCount,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.product.id !== action.productId);
      const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
      
      return {
        items: updatedItems,
        total,
        itemCount,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', productId: action.productId });
      }
      
      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
      
      return {
        items: updatedItems,
        total,
        itemCount,
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };
    
    case 'LOAD_CART': {
      const total = action.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = action.items.reduce((count, item) => count + item.quantity, 0);
      
      return {
        items: action.items,
        total,
        itemCount,
      };
    }
    
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [storedItems, setStoredItems] = useLocalStorage<CartItem[]>('cart', []);
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    dispatch({ type: 'LOAD_CART', items: storedItems });
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    setStoredItems(state.items);
  }, [state.items, setStoredItems]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId: string) => {
    const item = state.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
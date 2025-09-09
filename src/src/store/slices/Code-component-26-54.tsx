import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageType } from '../../types/navigation';

export interface NavigationHistoryItem {
  page: PageType;
  category?: string;
  productId?: string;
  searchQuery?: string;
}

export interface UIState {
  currentPage: PageType;
  navigationHistory: NavigationHistoryItem[];
  historyIndex: number;
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  isLoading: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: number;
  }>;
}

const initialState: UIState = {
  currentPage: 'home',
  navigationHistory: [{ page: 'home' }],
  historyIndex: 0,
  isCartOpen: false,
  isAuthModalOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  theme: 'system',
  isLoading: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<PageType>) => {
      state.currentPage = action.payload;
    },
    addToHistory: (state, action: PayloadAction<NavigationHistoryItem>) => {
      const newHistory = state.navigationHistory.slice(0, state.historyIndex + 1);
      newHistory.push(action.payload);
      state.navigationHistory = newHistory;
      state.historyIndex = newHistory.length - 1;
      state.currentPage = action.payload.page;
    },
    navigateBack: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        const historyItem = state.navigationHistory[state.historyIndex];
        state.currentPage = historyItem.page;
      }
    },
    navigateForward: (state) => {
      if (state.historyIndex < state.navigationHistory.length - 1) {
        state.historyIndex += 1;
        const historyItem = state.navigationHistory[state.historyIndex];
        state.currentPage = historyItem.page;
      }
    },
    setHistoryIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.navigationHistory.length) {
        state.historyIndex = action.payload;
        const historyItem = state.navigationHistory[action.payload];
        state.currentPage = historyItem.page;
      }
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalOpen = action.payload;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id' | 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setCurrentPage,
  addToHistory,
  navigateBack,
  navigateForward,
  setHistoryIndex,
  setCartOpen,
  setAuthModalOpen,
  setMobileMenuOpen,
  setSearchOpen,
  setTheme,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;